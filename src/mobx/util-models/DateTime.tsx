import { types } from "mobx-state-tree";
import moment from "moment";

export const DateTime = types.custom({
  name: "DateTime",
  fromSnapshot: string => moment.utc(string).local(),
  toSnapshot: (mDate: moment.Moment) => mDate.toISOString(),
  isTargetType: maybeMoment => moment.isMoment(maybeMoment),
  getValidationMessage: snapshot => {
    if (snapshot === undefined) return "";
    // const dateFormat = DATE_FORMAT;
    const mDate = moment(snapshot);
    if (!mDate.isValid()) {
      const message = `"${snapshot}" is not in valid date format`;
      console.error(message);
      return message;
    }
    return "";
  }
});
