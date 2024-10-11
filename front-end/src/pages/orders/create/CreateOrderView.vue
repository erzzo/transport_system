<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import PageHeader from '../../../components/PageHeader.vue';
  import { OrderType } from '../../../../../shared-models/order-type.enum';
import type { Order } from '../../../../../shared-models/order.interface';

  const order = reactive<Order>({
    orderNumber: '',
    customerName: '',
    date: null,
    waypoints: [{ location: '', type: OrderType.PICKUP }]
  });

  const waypointOptions = [
    { value: OrderType.PICKUP, text: 'Pickup' },
    { value: OrderType.DELIVERY, text: 'Delivery' },
  ]

  let hasError =  ref(false);

  const addWaypoint = () => {
    order.waypoints.push({ location: '', type: OrderType.PICKUP  })
  }

  const removeWaypoint = (index: number) => {
    order.waypoints.splice(index, 1);
  }

  const handleSubmit = () => {
    // simple validation example
    if (!order.orderNumber || !order.customerName || !order.date) {
      hasError.value = true;
      return;
    }

    console.log('Form submitted:', order);
  };
</script>

<template>
  <PageHeader title="Create new order"></PageHeader>

  <form @submit.prevent="handleSubmit">
    <label for="order-number">Order number</label>
    <b-form-input
      id="order-number"
      type="number"
      v-model="order.orderNumber"
    ></b-form-input>

    <label for="customer-name">Customer name</label>
    <b-form-input
      id="customer-name"
      type="text"
      v-model="order.customerName"
    ></b-form-input>

    <label for="date">Date</label>
    <b-form-input
      id="date"
      type="date"
      v-model="order.date"
    ></b-form-input>

    <div class="waypoints">
      <b class="title">
        Waypoints
        <b-button variant="success" size="sm" @click="addWaypoint">+ Add Waypoint</b-button>
      </b>

      <div
        v-for="(waypoint, index) in order.waypoints"
        :key="index"
        class="waypoint"
      >
        #{{ index + 1 }}
        <b-form-input
          type="text"
          placeholder="Location name or address"
          v-model="waypoint.location"
        ></b-form-input>

        <b-form-select
          v-model="waypoint.type"
          :options="waypointOptions"
        ></b-form-select>

        <b-button
          v-if="index !== 0"
          variant="danger"
          size="sm"
          @click="removeWaypoint(index)"
        >
          remove
        </b-button>
      </div>
    </div>

    <b-alert v-model="hasError" variant="danger">
      There are some important fields that are empty
    </b-alert>

    <b-button
      type="submit"
      variant="success"
      class="submit-button"
    >
      Place order
    </b-button>
  </form>
</template>

<style scoped lang="scss">
  form {
    margin: 20px;
    max-width: 400px;
  }

  .waypoints {
    margin: 20px 0 10px;
    padding: 15px;
    background-color: var(--silver-color);
    border-radius: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .waypoint {
      margin: 10px 0 20px;

      input,
      select {
        margin-bottom: 5px;
      }
    }
  }

  label {
    margin: 15px 0 5px;
  }
</style>
