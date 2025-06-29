<script setup lang="ts">
import FormField from './FormField.vue';

</script>

<template>
    <form>
        <FormField name="old_password" type="password" label="Old password" />
        <FormField name="new_password" type="password" label="New password" />
        <FormField name="new_password_confirm" type="password" label="New password confirmation" />
    </form>
</template>