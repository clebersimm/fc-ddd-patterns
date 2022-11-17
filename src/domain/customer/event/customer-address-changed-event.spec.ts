import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed-event";
import LogToConsoleWhenCustomerAddressChangeHandler from "./handler/log-to-console-when-customer-address-change-handler";

describe("Customer address changed event test", () => {
    it("should display a console log when the customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new LogToConsoleWhenCustomerAddressChangeHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
        ).toMatchObject(eventHandler)
        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: '1',
            name: 'Test',
            address: {
                street: 'Rua A',
                number: 1,
                zip: '000000',
                city: 'Florianopolis'
            }
        })
        eventDispatcher.notify(customerAddressChangedEvent)
        expect(spyEventHandler).toHaveBeenCalled()
    })

})