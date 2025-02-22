import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed-event";

export default class LogToConsoleWhenCustomerAddressChangeHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id},${event.eventData.name} alterado para:${event.eventData.address.street} ${event.eventData.address.number} ${event.eventData.address.zip} ${event.eventData.address.city}`)
    }

}