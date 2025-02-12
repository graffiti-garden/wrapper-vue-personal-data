<script setup lang="ts" generic="Schema extends JSONSchema4">
import { ref, watch } from "vue";
import type {
    GraffitiSession,
    GraffitiObject,
    JSONSchema4,
} from "@graffiti-garden/api";
import { useGraffiti, useGraffitiDiscover } from "@graffiti-garden/wrapper-vue";

const props = withDefaults(
    defineProps<{
        modelValue: GraffitiObject<Schema>["value"];
        name: string;
        session: GraffitiSession;
        schema: Schema;
        autosave?: boolean;
        public?: boolean;
    }>(),
    {
        autosave: false,
        public: false,
    },
);

const emit = defineEmits<{
    "update:modelValue": [value: GraffitiObject<Schema>["value"]];
}>();

const { results, poll, isPolling } = useGraffitiDiscover(
    () => [props.session.actor],
    () =>
        ({
            ...props.schema,
            properties: {
                name: {
                    enum: [props.name],
                },
                actor: {
                    enum: [props.session.actor],
                },
            },
        }) as const,
    () => props.session,
);

watch(
    results,
    () => {
        if (results.value && results.value.length) {
            const result = results.value.sort((a, b) => {
                return b.lastModified - a.lastModified;
            })[0].value as GraffitiObject<Schema>["value"];
            emit("update:modelValue", result);
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
