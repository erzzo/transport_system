<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import PageHeader from '../../../components/PageHeader.vue';
  import type { Order } from '../../../../../shared-models/order.interface';
  import OrdersViewTable from './OrdersViewTable.vue';

const orders = ref([]);
const loading = ref(false);

  const filters = reactive({
    customerName: '',
    date: new Date(),
  });

  const fetchData = async () => {
    loading.value = true;
    orders.value = [];

    try {
      const response = await fetch('http://localhost:3000/orders');
      orders.value = await response.json();
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
};

  // simplified filter function, this will be handled on BE, there will be many orders + pagination
  const filteredOrders = computed<Order[]>(() => {
    if (!filters.customerName && !filters.date) {
      return orders.value;
    }

    return orders.value.filter((order: Order) => {
      const filteredDate = filters.date ? new Date(filters.date) : null;
      const orderDate = new Date(order.date);

      // for that I would use a library like momen, datafns
      const isSameDate = orderDate.getFullYear() === filteredDate?.getFullYear() &&
        orderDate.getMonth() === filteredDate?.getMonth() &&
        orderDate.getDay() === filteredDate?.getDay()

      return (
        order.customerName.toLowerCase().includes(filters.customerName.toLowerCase()) &&
        (filters.date ? isSameDate : true)
      )
    })
  })

  onMounted(fetchData);
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

  <div v-if="!loading && !orders.length" class="alert alert-info">There are no orders yet</div>
  <div v-if="!loading && orders.length && !filteredOrders.length" class="alert alert-info">No orders match this search criteria</div>
  <div v-if="loading">Loading orders...</div>
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
