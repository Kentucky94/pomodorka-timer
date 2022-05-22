export default class TimeParser {
    private SECONDS_IN_MINUTE = 60;
    private static instance: TimeParser | null = null;

    private constructor () {}

    private getFullMinutesFromSeconds (seconds: number) {
        if (seconds < 0) return 0;

        return Math.floor(seconds / this.SECONDS_IN_MINUTE);
    }

    private getRestSeconds (seconds: number) {
        if (seconds < 0) return 0;

        return seconds % this.SECONDS_IN_MINUTE;
    }

    private addZeroes (number: number) {
        if (number < 0) return "00";

        return number < 10 ? "0" + number : number.toString();
    }

    public getMinutesinSeconds (minutes: number) {
        return minutes * this.SECONDS_IN_MINUTE;
    }

    public getParsedSeconds (seconds: number) {
        const fullMinutes = this.addZeroes(this.getFullMinutesFromSeconds(seconds));
        const restSeconds = this.addZeroes(this.getRestSeconds(seconds));

        return `${fullMinutes}:${restSeconds}`;
    }

    public static getParser () {
        if (!TimeParser.instance) {
            TimeParser.instance = new TimeParser();
        }

        return TimeParser.instance;
    }
}