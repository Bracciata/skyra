import { GuildSettings, readSettings, writeSettings } from '#lib/database';
import { LanguageKeys } from '#lib/i18n/languageKeys';
import { SkyraCommand } from '#lib/structures';
import type { GuildMessage } from '#lib/types';
import { PermissionLevels } from '#lib/types/Enums';
import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SkyraCommand.Options>({
	aliases: ['mcc'],
	description: LanguageKeys.Commands.Management.ManageCommandChannelDescription,
	extendedHelp: LanguageKeys.Commands.Management.ManageCommandChannelExtended,
	permissionLevel: PermissionLevels.Administrator,
	runIn: ['GUILD_ANY'],
	subCommands: ['add', 'remove', 'reset', { input: 'show', default: true }]
})
export class UserCommand extends SkyraCommand {
	public async add(message: GuildMessage, args: SkyraCommand.Args) {
		const channel = await args.pick('textChannelName');
		const command = await args.pick('command');
		await writeSettings(message.guild, (settings) => {
			const disabledCommandsChannels = settings[GuildSettings.DisabledCommandChannels];
			const indexOfChannel = disabledCommandsChannels.findIndex((e) => e.channel === channel.id);

			if (indexOfChannel === -1) {
				settings[GuildSettings.DisabledCommandChannels].push({ channel: channel.id, commands: [command.name] });
			} else {
				const disabledCommandChannel = disabledCommandsChannels[indexOfChannel];
				if (disabledCommandChannel.commands.includes(command.name))
					this.error(LanguageKeys.Commands.Management.ManageCommandChannelAddAlreadySet);

				settings[GuildSettings.DisabledCommandChannels][indexOfChannel].commands.push(command.name);
			}
		});

		const content = args.t(LanguageKeys.Commands.Management.ManageCommandChannelAdd, { channel: channel.toString(), command: command.name });
		return send(message, content);
	}

	public async remove(message: GuildMessage, args: SkyraCommand.Args) {
		const channel = await args.pick('textChannelName');
		const command = await args.pick('command');
		await writeSettings(message.guild, (settings) => {
			const disabledCommandsChannels = settings[GuildSettings.DisabledCommandChannels];
			const indexOfChannel = disabledCommandsChannels.findIndex((e) => e.channel === channel.id);

			if (indexOfChannel === -1) {
				this.error(LanguageKeys.Commands.Management.ManageCommandChannelRemoveNotSet, { channel: channel.toString() });
			}

			const disabledCommandChannel = disabledCommandsChannels[indexOfChannel];
			const indexOfDisabledCommand = disabledCommandChannel.commands.indexOf(command.name);

			if (indexOfDisabledCommand !== -1) {
				if (disabledCommandChannel.commands.length > 1) {
					settings[GuildSettings.DisabledCommandChannels][indexOfChannel].commands.splice(indexOfDisabledCommand, 1);
				} else {
					settings[GuildSettings.DisabledCommandChannels].splice(indexOfChannel, 1);
				}
			}
		});

		const content = args.t(LanguageKeys.Commands.Management.ManageCommandChannelRemove, { channel: channel.toString(), command: command.name });
		return send(message, content);
	}

	public async reset(message: GuildMessage, args: SkyraCommand.Args) {
		const channel = await args.pick('textChannelName');
		await writeSettings(message.guild, (settings) => {
			const disabledCommandsChannels = settings[GuildSettings.DisabledCommandChannels];
			const entryIndex = disabledCommandsChannels.findIndex((e) => e.channel === channel.id);

			if (entryIndex === -1) {
				this.error(LanguageKeys.Commands.Management.ManageCommandChannelResetEmpty);
			}

			settings[GuildSettings.DisabledCommandChannels].splice(entryIndex, 1);
		});

		const content = args.t(LanguageKeys.Commands.Management.ManageCommandChannelReset, { channel: channel.toString() });
		return send(message, content);
	}

	public async show(message: GuildMessage, args: SkyraCommand.Args) {
		const channel = await args.pick('textChannelName');
		const disabledCommandsChannels = await readSettings(message.guild, GuildSettings.DisabledCommandChannels);

		const entry = disabledCommandsChannels.find((e) => e.channel === channel.id);
		if (!entry?.commands.length) {
			this.error(LanguageKeys.Commands.Management.ManageCommandChannelShowEmpty);
		}

		const content = args.t(LanguageKeys.Commands.Management.ManageCommandChannelShow, {
			channel: channel.toString(),
			commands: `\`${entry.commands.join('` | `')}\``
		});
		return send(message, content);
	}
}