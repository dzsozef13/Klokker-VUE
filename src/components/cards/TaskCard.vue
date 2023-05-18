<script setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignedUser: {
        type: String,
        default: '',
    },
    startDate: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    billable: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="task-card">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div v-if="assignedUser" class="assigned-user">
        <strong>Assigned To:</strong> {{ assignedUser }}
      </div>
      <div class="date-range">
        <strong>Due Dates:</strong> {{ startDate }} - {{ dueDate }}
      </div>
      <div class="task-state">
        <strong>State:</strong>
        <span class="dot" :class="state"></span>
      </div>
      <div class="billable">
        <strong>Billable:</strong> {{ billable ? 'Yes' : 'No' }}
      </div>
    </div>
  </template>
  
  <style scoped>
  .task-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
  }
  
  .assigned-user {
    margin-top: 8px;
  }
  
  .date-range {
    margin-top: 8px;
  }
  
  .task-state {
    margin-top: 8px;
  }
  
  .dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 8px;
  }
  
  .billable {
    margin-top: 8px;
  }
  </style>