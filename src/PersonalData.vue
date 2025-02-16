<script setup lang="ts" generic="Schema extends JSONSchema">
import { ref, watch, onScopeDispose } from "vue";
import type {
    GraffitiSession,
    GraffitiObject,
    JSONSchema,
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

// Store the original value
const initialValue = JSON.stringify(props.modelValue);
onScopeDispose(() => {
    // Reset the value when no longer using the object
    emit("update:modelValue", JSON.parse(initialValue));
});

const emit = defineEmits<{
    "update:modelValue": [value: GraffitiObject<Schema>["value"]];
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

const { results, poll, isPolling } = useGraffitiDiscover<Schema>(
    () => [props.session.actor],
    () => {
        const schema =
            typeof props.schema === "object"
                ? props.schema
                : ({} as Schema & object);
        return {
            ...schema,
            properties: {
                ...schema.properties,
                ...nameActorSchema.properties,
            },
        } as const;
    },
    () => props.session,
);

watch(
    results,
    () => {
        if (results.value && results.value.length) {
            const result: GraffitiObject<Schema> & { tombstone: false } =
                results.value.toSorted((a, b) => {
                    return b.lastModified - a.lastModified;
                })[0];
            const value = result.value as GraffitiObject<Schema>["value"];
            emit("update:modelValue", value);
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
