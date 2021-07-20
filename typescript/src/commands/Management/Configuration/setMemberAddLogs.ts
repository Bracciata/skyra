import { GuildSettings } from '#lib/database';
import { LanguageKeys } from '#lib/i18n/languageKeys';
import { ChannelConfigurationCommand } from '#lib/structures';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<ChannelConfigurationCommand.Options>({
	description: LanguageKeys.Commands.Management.SetMemberAddLogsDescription,
	extendedHelp: LanguageKeys.Commands.Management.SetMemberAddLogsExtended,
	responseKey: LanguageKeys.Commands.Management.SetMemberAddLogsSet,
	settingsKey: GuildSettings.Channels.Logs.MemberAdd
})
export class UserChannelConfigurationCommand extends ChannelConfigurationCommand {}