import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id
        },
      }
    )
    const updates = entity.items.map(item => {
      OrderItemModel.update({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      },
        {
          where: {
            id: item.id
          }
        }
      )
    })
    await Promise.all(updates)
  }

  async find(id: string): Promise<Order> {
    let customerModel
    try {
      customerModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: [OrderItemModel]
      })
    } catch (error) {
      throw new Error("Order not found")
    }
    const ordemItens = customerModel.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    })
    const order = new Order(id, customerModel.customer_id, ordemItens)

    return order
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [OrderItemModel] })
    const orders = orderModels.map((orderTemp) => {
      const ordemItems = orderTemp.items.map((item) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      })
      let order = new Order(orderTemp.id, orderTemp.customer_id, ordemItems)
      return order
    })
    return orders
  }
}
