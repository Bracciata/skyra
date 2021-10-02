import { Events } from '#lib/types/Enums';
import type { LLRCData } from '#utils/LongLivingReactionCollector';
import { resolveEmoji } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { canReadMessages, isGuildBasedChannel } from '@sapphire/discord.js-utilities';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { GatewayDispatchEvents, GatewayMessageReactionAddDispatch } from 'discord-api-types/v9';
import type { TextChannel } from 'discord.js';

@ApplyOptions<ListenerOptions>({ event: GatewayDispatchEvents.MessageReactionAdd, emitter: 'ws' })
export class UserListener extends Listener {
	public run(raw: GatewayMessageReactionAddDispatch['d']) {
		const channel = this.container.client.channels.cache.get(raw.channel_id) as TextChannel | undefined;
		if (!channel || !isGuildBasedChannel(channel) || !canReadMessages(channel)) return;

		const data: LLRCData = {
			channel,
			emoji: {
				animated: raw.emoji.animated ?? false,
				id: raw.emoji.id,
				managed: raw.emoji.managed ?? null,
				name: raw.emoji.name,
				requireColons: raw.emoji.require_colons ?? null,
				roles: raw.emoji.roles || null,
				// eslint-disable-next-line @typescript-eslint/dot-notation
				user: (raw.emoji.user && this.container.client.users['_add'](raw.emoji.user)) ?? { id: raw.user_id }
			},
			guild: channel.guild,
			messageId: raw.message_id,
			userId: raw.user_id
		};

		for (const llrc of this.container.client.llrCollectors) {
			llrc.send(data);
		}

		const emoji = resolveEmoji(data.emoji);
		if (emoji === null) return;

		this.container.client.emit(Events.RawReactionAdd, data, emoji);

		// For adding reaction roles we need to handle the emoji differently so it is a different event
		this.container.client.emit(Events.RawReactionAddRole, data, data.emoji.id ?? emoji);
	}
}
