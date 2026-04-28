export function transformParticipants(raw: any): string[] {
	return Object.values(raw).flatMap((arr) =>
		Array.isArray(arr) ? arr.filter((item) => item?.participantText).map((item) => item.participantText) : [],
	);
}