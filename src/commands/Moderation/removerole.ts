import { LanguageKeys } from '#lib/i18n/languageKeys';
import { HandledCommandContext, ModerationCommand } from '#lib/moderation';
import type { GuildMessage } from '#lib/types';
import { PermissionLevels } from '#lib/types/Enums';
import { getImage } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { Time } from '@sapphire/time-utilities';
import type { Role } from 'discord.js';

@ApplyOptions<ModerationCommand.Options>({
	aliases: ['rro'],
	description: LanguageKeys.Commands.Moderation.RemoveRoleDescription,
	extendedHelp: LanguageKeys.Commands.Moderation.RemoveRoleExtended,
	optionalDuration: true,
	permissionLevel: PermissionLevels.Administrator,
	requiredClientPermissions: ['MANAGE_ROLES'],
	requiredMember: true
})
export class UserModerationCommand extends ModerationCommand {
	protected async resolveOverloads(args: ModerationCommand.Args) {
		return {
			targets: await args.repeat('user', { times: 10 }),
			role: await args.pick('roleName'),
			duration: this.optionalDuration ? await args.pick('timespan', { minimum: 0, maximum: Time.Year * 5 }).catch(() => null) : null,
			reason: args.finished ? null : await args.rest('string')
		};
	}

	protected async handle(message: GuildMessage, context: HandledCommandContext & { role: Role }) {
		return message.guild.security.actions.removeRole(
			{
				userId: context.target.id,
				moderatorId: message.author.id,
				reason: context.reason,
				imageURL: getImage(message),
				duration: context.duration
			},
			context.role,
			await this.getTargetDM(message, context.args, context.target)
		);
	}
}
