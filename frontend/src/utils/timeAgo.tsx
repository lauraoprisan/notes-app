export const formatDate = (date: string): string => {
	const noteDate = new Date(date);
	const now = new Date();

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const hoursPassed = Math.floor((now.getTime() - noteDate.getTime()) / 1000 / 60 / 60);

	const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');

	if (hoursPassed < 24) {
		return `${formatTwoDigits(noteDate.getHours())}:${formatTwoDigits(noteDate.getMinutes())}`;
	} else if (hoursPassed < 48) {
		return `yesterday`;
	} else {
		return `${noteDate.getDate()} ${months[noteDate.getMonth()]}`;
	}
};