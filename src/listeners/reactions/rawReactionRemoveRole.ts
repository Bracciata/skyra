import { GuildSettings, readSettings } from '#lib/database';
import { Events } from '#lib/types/Enums';
import { resolveEmoji } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { isGuildBasedChannel } from '@sapphire/discord.js-utilities';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { GatewayMessageReactionRemoveDispatch } from 'discord-api-types/v9';
import type { TextChannel } from 'discord.js';

@ApplyOptions<ListenerOptions>({ event: Events.RawReactionRemove })
export class UserListener extends Listener {
	public async run(channel: TextChannel, data: GatewayMessageReactionRemoveDispatch['d']) {
		// If the channel is not a text channel then stop processing
		if (!isGuildBasedChannel(channel)) return;

		const parsed = data.emoji.id ?? resolveEmoji(data.emoji);
		if (!parsed) return;

		const roleEntry = await readSettings(channel.guild, (settings) =>
			settings[GuildSettings.ReactionRoles].find(
				(entry) =>
					entry.emoji === parsed && //
					entry.channel === data.channel_id &&
					(entry.message ? entry.message === data.message_id : true)
			)
		);
		if (!roleEntry) return;

		try {
			const member = await channel.guild.members.fetch(data.user_id);
			if (member.roles.cache.has(roleEntry.role)) await member.roles.remove(roleEntry.role);
		} catch (error) {
			this.container.client.emit(Events.Error, error);
		}
	}
}
