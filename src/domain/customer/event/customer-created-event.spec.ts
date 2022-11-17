import EventDispatcher from "../../@shared/event/event-dispatcher"
import CustomerCreatedEvent from "./customer-created.event";
import LogToConsoleWhenCustomerIsCreatedHandler1 from "./handler/log-to-console-when-customer-is-created-handler1.handler";
import LogToConsoleWhenCustomerIsCreatedHandler2 from "./handler/log-to-console-when-customer-is-created-handler2.handler";

describe('Customer created event tests', () => {
    it("should display a console log when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new LogToConsoleWhenCustomerIsCreatedHandler1();
        const eventHandler2 = new LogToConsoleWhenCustomerIsCreatedHandler2();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler)
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler2)
        const customerCratedEvent = new CustomerCreatedEvent({
            name: 'Test',
            id: '1'
        })
        eventDispatcher.notify(customerCratedEvent)
        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })
})