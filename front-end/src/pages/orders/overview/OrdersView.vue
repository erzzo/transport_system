<script setup lang="ts">
  import PageHeader from '../../../components/PageHeader.vue';
  import type { Order } from '../../../../../shared-models/order.interface';
  import { OrderType } from '../../../../../shared-models/order-type.enum';
  import OrdersViewTable from './OrdersViewTable.vue';
import { computed, reactive } from 'vue';

  const filters = reactive({
    customerName: '',
    date: new Date(),
  });

  const orders: Order[] = [
    {
      customerName: 'Lajos',
      orderNumber: 987651635,
      date: new Date(),
      waypoints: [
        { location: 'Microsoft hq', type: OrderType.DELIVERY },
        { location: 'Microsoft sub', type: OrderType.PICKUP }
      ]
    },
    {
      customerName: 'Mark',
      orderNumber: 999855544,
      date: new Date(),
      waypoints: [
        { location: 'facebook hq', type: OrderType.PICKUP }
      ]
    }
  ];

  // simplified filter function, this will be handled on BE, there will be many orders + pagination
  const filteredOrders = computed<Order[]>(() => {
    if (!filters.customerName && !filters.date) {
      return orders;
    }

    return orders.filter((order) => {
      const filteredDate = filters.date ? new Date(filters.date) : null;
      // for that I would use a library like momen, datafns
      const isSameDate = order.date?.getFullYear() === filteredDate?.getFullYear() &&
        order.date?.getMonth() === filteredDate?.getMonth() &&
        order.date?.getDay() === filteredDate?.getDay()

      return (
        order.customerName.toLowerCase().includes(filters.customerName.toLowerCase()) &&
        (filters.date ? isSameDate : true)
      )
    }
    )
  })
</script>

<template>
  <PageHeader title="Orders">
    <b-button to="/create-order" variant="success">Create order</b-button>
  </PageHeader>

  <!-- This could be a own component -->
  <div class="filter-header">
    <b-form-input
      type="text"
      placeholder="Search by customer name"
      v-model="filters.customerName"
    ></b-form-input>

    <b-form-input
      type="date"
      v-model="filters.date"
    ></b-form-input>
  </div>

  <OrdersViewTable
    v-if="filteredOrders.length"
    :orders="filteredOrders"
  ></OrdersViewTable>

  <div v-if="!orders.length" class="alert alert-info">There are no orders yet</div>
  <div v-if="orders.length && !filteredOrders.length" class="alert alert-info">No orders match this search criteria</div>
</template>

<style scoped lang="scss">
  .filter-header {
    display: flex;
    padding: 10px;

    input {
      margin-right: 20px;
      max-width: 300px;
    }
  }

  .alert {
    margin: 10px;
    max-width: 300px;
  }
</style>
