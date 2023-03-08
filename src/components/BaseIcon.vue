<template>
    <div>
        <div class="icon-wrapper" v-html="svg"></div>
        <slot></slot>
    </div>
</template>

<script>
import feather from 'feather-icons'

export default {
props: {
    name: String,
    width: {
        type: Number,
        default: 24
    },
    height: {
        type: Number,
        default: 24
    },
    color: {
        type:String,
        default: `#2196f3`
    }
},
computed: {
    svg(){
        return feather.icons[this.name].toSvg({class:'icon', height: this.height, width: this.width, color:this.color})
    }
}

}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: 'primary';
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>