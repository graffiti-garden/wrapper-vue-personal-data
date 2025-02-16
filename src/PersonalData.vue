<script setup lang="ts">
import { ref, watch, onScopeDispose } from "vue";
import type { GraffitiSession, JSONSchema } from "@graffiti-garden/api";
import { useGraffiti, useGraffitiDiscover } from "@graffiti-garden/wrapper-vue";

const props = withDefaults(
    defineProps<{
        modelValue: {};
        name: string;
        session: GraffitiSession;
        autosave?: boolean;
        public?: boolean;
    }>(),
    {
        autosave: false,
        public: false,
    },
);

// Store the original value
const initialValue = JSON.stringify(props.modelValue);
onScopeDispose(() => {
    // Reset the value when no longer using the object
    emit("update:modelValue", JSON.parse(initialValue));
});

const emit = defineEmits<{
    "update:modelValue": [value: {}];
}>();

const nameActorSchema = {
    properties: {
        name: {
            type: "string",
            enum: [props.name],
        },
        actor: {
            type: "string",
            enum: [props.session.actor],
        },
    },
} as const satisfies JSONSchema;

const { results, poll, isPolling } = useGraffitiDiscover(
    () => [props.session.actor],
    nameActorSchema,
    () => props.session,
);

watch(
    results,
    () => {
        if (results.value && results.value.length) {
            const result = results.value.toSorted((a, b) => {
                return b.lastModified - a.lastModified;
            })[0];
            emit("update:modelValue", result.value);
        }
    },
    { immediate: true },
);

watch(
    () => props.modelValue,
    () => {
        if (props.autosave) {
            save();
        }
    },
    { deep: true },
);

const graffiti = useGraffiti();
const isSaving = ref(false);
async function save() {
    isSaving.value = true;
    await graffiti.put(
        {
            channels: [props.session.actor],
            value: props.modelValue,
            name: props.name,
            ...(props.public ? {} : { allowed: [] }),
        },
        props.session,
    );
    isSaving.value = false;
}
</script>

<template>
    <slot
        :save="save"
        :poll="poll"
        :isPolling="isPolling"
        :isSaving="isSaving"
    ></slot>
</template>
