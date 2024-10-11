<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import type { Order } from '../../../../../shared-models/order.interface';

  defineProps<{
    orders: Order[]
  }>()

  const openedIndex: Ref<null | number> = ref(null);

  const toggleWaypoints = (index: number) => {
    openedIndex.value = openedIndex.value === index ? null : index;
  }
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#Number</th>
        <th scope="col">Customer Name</th>
        <th scope="col">Date</th>
        <th scope="col"></th>
      </tr>
    </thead>

    <tbody>
      <template  v-for="(order, index) in orders" :key="order.orderNumber">
        <tr>
          <th scope="row">{{ order.orderNumber }}</th>
          <td>{{ order.customerName }}</td>
          <td>{{ order.date?.toLocaleDateString() }}</td>
          <td>
            <b-button variant="outline-secondary" size="sm" @click="() => toggleWaypoints(index)">
              {{ index === openedIndex ? 'hide' : 'show'}}
              waypoints
            </b-button>
          </td>
        </tr>

      <tr v-if="index === openedIndex">
        <td></td>
        <td class="waypoints" colspan="3">
            <div v-for="(waypoint, waypointIndex) in order.waypoints" :key="waypoint.location" class="waypoint-item">
              <div class="details">
                <b>{{ waypoint.location }}</b>
                <span>{{ waypoint.type }}</span>
              </div>

              <span v-if="waypointIndex < order.waypoints.length - 1" class="arrow">></span>
            </div>
            </td>
          </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
  .waypoints {
    .waypoint {
      &-item {
        display: inline-flex;
        align-items: center;

        .details {
          display: flex;
          flex-direction: column;
        }

        .arrow {
          margin: 0 15px;
        }
      }
    }
  }
</style>
