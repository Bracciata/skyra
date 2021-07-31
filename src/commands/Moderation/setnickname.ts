import { LanguageKeys } from '#lib/i18n/languageKeys';
import { HandledCommandContext, ModerationCommand } from '#lib/moderation';
import type { GuildMessage } from '#lib/types';
import { getImage } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { Time } from '@sapphire/time-utilities';

@ApplyOptions<ModerationCommand.Options>({
	aliases: ['sn'],
	description: LanguageKeys.Commands.Moderation.SetNicknameDescription,
	extendedHelp: LanguageKeys.Commands.Moderation.SetNicknameExtended,
	optionalDuration: true,
	requiredClientPermissions: ['MANAGE_NICKNAMES'],
	requiredMember: true
})
export class UserModerationCommand extends ModerationCommand {
	protected async resolveOverloads(args: ModerationCommand.Args) {
		return {
			targets: await args.repeat('user', { times: 10 }),
			nickname: args.finished ? null : await args.pick('string'),
			duration: this.optionalDuration ? await args.pick('timespan', { minimum: 0, maximum: Time.Year * 5 }).catch(() => null) : null,
			reason: args.finished ? null : await args.rest('string')
		};
	}

	protected async handle(message: GuildMessage, context: HandledCommandContext & { nickname: string }) {
		return message.guild.security.actions.setNickname(
			{
				userId: context.target.id,
				moderatorId: message.author.id,
				reason: context.reason,
				imageURL: getImage(message),
				duration: context.duration
			},
			context.nickname,
			await this.getTargetDM(message, context.args, context.target)
		);
	}
}
