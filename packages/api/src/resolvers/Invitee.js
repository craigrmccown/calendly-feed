const Subscription = {
  inviteeEvents: {
    subscribe: (rootValue, args, { pubsub }) =>
      pubsub.asyncIterator(['INVITEE_CREATED', 'INVITEE_CANCELED']),
    resolve: ({
      event: actionType,
      payload: {
        event: {
          start_time: startTime,
          end_time: endTime,
          created_at: createdAt,
          location,
          canceled,
          canceler_name: cancelerName,
          cancel_reason: cancelReason,
          canceled_at: canceledAt,
        },
        event_type: eventType,
        invitee,
      },
    }) => ({
      actionType,
      event: {
        startTime,
        endTime,
        createdAt,
        location,
      },
      eventType: { kind: eventType.kind, name: eventType.name, duration: eventType.duration },
      invitee: {
        id: invitee.uuid,
        name: invitee.name,
        email: invitee.email,
        phoneNumber: invitee.text_reminder_number,
      },
      cancellation: canceled ? { cancelerName, cancelReason, canceledAt } : null,
    }),
  },
}

export default { Subscription }
