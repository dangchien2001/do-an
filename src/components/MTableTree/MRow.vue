<template>
  <tr
    :class="[
      activeRow == index ? 'row-active' : 'table-body-row',
      { 'table-body-row-active': rows[index] },
      'row-index',
    ]"
    :tabindex="index"
    ref="row"
    v-if="isShowChildren"
  >
    <!-- checkbox col -->
    <td class="table-select-box-col-td" v-if="true">
      <div v-if="item.is_parent == 1" :class="[isShowChildrenInChildren ? 'close-icon' : 'open-icon']" @click="() => {isShowChildrenInChildren = !isShowChildrenInChildren}"></div>
    </td>

    <!-- dữ liệu col -->
    <td
      class=""
      v-for="(propertie, index) in properties"
      :key="index"
      :style="[propertie.style, propertie.key ? `padding-left: ${40 * level}px; ` : '']"
    >
      {{ this.formatMoney(item[propertie.name]) }}
    </td>

    <!-- function col -->
    <td class="function-col" v-if="false">
      <div class="edit-icon" @click="this.$emit('edit', item[0])">
        <MTooltip class="edit-tooltip" text="Sửa tài sản"></MTooltip>
      </div>
      <div class="clone-icon" @click="cloneProduct(item.asset_id)">
        <MTooltip class="clone-tooltip" text="Nhân bản tài sản"></MTooltip>
      </div>
    </td>

    <!-- function col (edit, delete) -->
    <td class="function-col" v-if="true">
      <div
        class="edit-icon"
        @click="this.$emit('edit', item)"
      >
        <MTooltip
          class="edit-tooltip"
          :text="'Sửa'"
        ></MTooltip>
      </div>
      <div
        class="delete-icon"
        @click="
          () => {
            this.$emit('delete', item);
          }
        "
      >
        <MTooltip
          class="delete-tooltip"
          :text="'Xóa'"
        ></MTooltip>
      </div>
    </td>
  </tr>
  <MRow
    v-for="(item, index) in item.children"
    :item="item"
    :index="index"
    :key="index"
    :properties="properties"
    :dataAvailable="dataAvailable"
    :allowFunctionCol="true"
    :level="item.level"
    :isShowChildren="isShowChildrenInChildren"
    @edit="(data) => $emit('edit', data)"
        @delete="(data) => $emit('delete', data)"
  ></MRow>
</template>

<script>
import comon from "@/js/comon";
import MTooltip from "../MTooltip/MTooltip.vue";

export default {
  components: {
    MTooltip,
  },
  props: {
    item: Object,
    index: Number,
    level: Number,
    properties: Array,
    dataAvailable: Array,
    activeRow: Number,
    allowCheckBox: Boolean,
    allowFunctionCol: Boolean,
    allowEditAndDeleteCol: Boolean,
    isShowChildren: Boolean
  },
  methods: {
    formatMoney(money) {
      return comon.formatMoney(money);
    },
  },
  watch: {
    isShowChildren: function (newValue) {
      if (newValue != undefined) {
        this.isShowChildrenInChildren = newValue;
      }
    },
  },
  data() {
    return {
      rows: new Array(100).fill(false),
      isShowChildrenInChildren: true
    };
  },
};
</script>
<style scoped>
@import url(./tableTree.css);
</style>
