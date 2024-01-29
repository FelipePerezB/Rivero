import { Messages, Status } from "@prisma/client";

export default function getStatus(message: Messages) {
  const indicators = {
    [Status.RESOLVED]: [Messages.CHANGED_GROUP, Messages.RESOLVED],
    [Status.PENDING]: [
      Messages.CONFIRMATION_REQUIRED,
      Messages.INVITATION_SENT,
    ],
    [Status.REJECTED]: [
      Messages.CANCELLED,
      Messages.DUPLICATED_RECORD,
      Messages.DUPLICATED_RECORD,
      Messages.INVALID_EMAIL,
    ],
  };
  const [status] = Object.entries(indicators)?.find(([status, messages]) =>
    messages.find((msg) => msg === message)
  ) as [status: Status, messages: Messages[]];
  return status
}