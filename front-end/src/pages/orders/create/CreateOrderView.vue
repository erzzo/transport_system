<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import PageHeader from '../../../components/PageHeader.vue';
  import { OrderType } from '../../../../../shared-models/order-type.enum';
  import type { Order } from '../../../../../shared-models/order.interface';
  import router from '../../../router';

  const loading = ref(false);
  let hasError =  ref(false);

  const order = reactive<Order>({
    orderNumber: '',
    customerName: '',
    date: null,
    waypoints: [{ location: '', type: OrderType.PICKUP }]
  });

  // reset error on order value change
  watch(
    () => ({ ...order }),
    () => {
      hasError.value = false
    },
    { deep: true }
  );

  const waypointOptions = [
    { value: OrderType.PICKUP, text: 'Pickup' },
    { value: OrderType.DELIVERY, text: 'Delivery' },
  ]

  const addWaypoint = () => {
    order.waypoints.push({ location: '', type: OrderType.PICKUP  })
  }

  const removeWaypoint = (index: number) => {
    order.waypoints.splice(index, 1);
  }

  const handleSubmit = async () => {
    // simple validation example
    if (!order.orderNumber || !order.customerName || !order.date) {
      hasError.value = true;
      return;
    }

    loading.value = true;

    // this could be moved to some api service file
    try {
      const result = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });

      if (result.ok) {
        router.push('/');
      }
      // else, show BE error
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false;
    }
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
      {{ loading ? 'Saving...' : 'Save order' }}
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
