<script setup lang="ts">
import { ref } from "vue";

const autosave = ref(false);
const name = ref("my-data");

const myData = ref({
    myProperty: "default value",
    myArray: [
        {
            myNestedProperty: "default value",
        },
    ],
});
</script>

<template>
    <p v-if="$graffitiSession.value">
        Logged in as: {{ $graffitiSession.value.actor }}
        <button @click="$graffiti.logout($graffitiSession.value)">
            Log out
        </button>
    </p>
    <p v-else>
        <button @click="$graffiti.login()">Log in</button>
    </p>

    <section>
        <h2>My Data</h2>
        <label for="myProperty">My Property:</label>
        <input type="text" id="myProperty" v-model="myData.myProperty" />

        <ul>
            <li v-for="(item, index) in myData.myArray" :key="index">
                <label :for="'myNestedProperty' + index"
                    >My Nested Property:</label
                >
                <input
                    type="text"
                    :id="'myNestedProperty' + index"
                    v-model="item.myNestedProperty"
                />
                <button @click="myData.myArray.splice(index, 1)">Remove</button>
            </li>
        </ul>
        <button @click="myData.myArray.push({ myNestedProperty: '' })">
            Add Nested Property
        </button>
    </section>

    <section>
        <h2>My Data Saving</h2>

        <label for="name">A name for your data: </label>
        <input type="text" id="name" v-model="name" />
        <br />

        <label for="autosave">Autosave?</label>
        <input type="checkbox" id="autosave" v-model="autosave" />
        <br />
        <GraffitiPersonalData
            v-if="$graffitiSession.value"
            v-model="myData"
            :name="name"
            :schema="{
                properties: {
                    value: {
                        properties: {
                            myProperty: { type: 'string' },
                            myArray: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        myNestedProperty: { type: 'string' },
                                    },
                                    required: ['myNestedProperty'],
                                },
                            },
                        },
                        required: ['myProperty', 'myArray'],
                    },
                },
            }"
            :session="$graffitiSession.value"
            :autosave="autosave"
            v-slot="{ save }"
        >
            <template v-if="autosave">
                <p>Your data is being saved automatically.</p>
            </template>
            <button v-else @click="save()">Save My Data</button>
        </GraffitiPersonalData>
    </section>
</template>
