<template>
    <div ref="accordion" class="accordion" :class="{ 'accordion--close': !props.isOpened }">
      <div class="accordion-inner__wrapper">
          <slot name="title" />
          <slot name="comments" />
      </div>
    </div>
  
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
const props = defineProps( {
    isOpened: {
        type: Boolean,
        default: false,
    },
    trigger: {
        type: Number,
        default: 0
    }

} )

const accordion = ref()
const calculateHeight = () => {
    if ( accordion.value.style.maxHeight ) { 
        accordion.value.style.maxHeight = null
    } else {            
        nextTick( () => {
            accordion.value.style.maxHeight = 1000 + 'px'
        } )
    }
}

watch( () => props.isOpened, () => {
    calculateHeight()
} )

defineExpose( { 
    calculateHeight
} )


</script>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>

