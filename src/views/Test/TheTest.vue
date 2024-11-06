<template>
  <div>
    <TableCombo
      :tableTh="voucherTh"
      :footer="'newFooter'"
      :arrayTotal="dataTotalVoucher"
      @cancelLoading="
        () => {
          this.$emit('cancelLoading');
        }
      "
      @startLoading="
        () => {
          this.$emit('startLoading');
        }
      "
      model="voucher"
      colspan="5"
      typeTable="table-container-non-border"
      :dataFooter="assetFooter"
      :boldRow="true"
      :allowEditAndDeleteCol="true"
      :allowGetAll="false"
      @objectAfterClickRow="
        (object) => {
          handleVoucherIdAfterClickRow(object);
        }
      "
      :dataAvailable="dataVoucher"
      :totalRecord="totalRecordVoucher"
      :totalPageProp="totalPageVoucher"
      :currentPageProp="currentPageVoucher"
      @updateCurrentPage="updateCurrentPage"
      numOfActivePage="1"
      @updateNumberOfRecord="
        (e) => {
          pageSizeVoucher = e;
        }
      "
      :allowPaging="true"
      :allowCheckBox="true"
      @edit="handleEdit"
      entity="voucher_code"
      @listAssetForDelete="(data) => (voucherCodeForDelete = data)"
      @delete="
        (data) => {
          voucherCodeForDeleteOnce = data;
          isShowPopUpDeleteOnce = true;
        }
      "
      :tableChange2="tableChange2"
      :activeRow="activeRow"
    ></TableCombo>
  </div>
</template>

<script>
import axios from "axios";
import TableCombo from "../../components/MTableCombo/MTableCombo.vue";
import resource from "@/js/resource";
import config from "@/js/config";

export default {
  components: {
    TableCombo,
  },
  async created() {
    // gọi api phân trang bảng voucher đổ chứng từ vào table
    // Created by: NDCHIEN(19/4/2023)
    await this.voucherFilter(
      this.keyWord,
      this.pageSizeVoucher,
      this.currentPageVoucher
    );
  },
  mounted() {},
  methods: {
    /**
     * Hàm gọi api phân trang bảng voucher
     * Created by: NDCHIEN(19/4/2023)
     */
    async voucherFilter(keyWord, pageSize, pageNumber) {
      this.$emit("startLoading");
      await axios
        .get(this.voucherAPI.filterVoucher(keyWord, pageSize, pageNumber))
        .then((res) => {
          this.dataVoucher = res.data.Data;
          this.dataTotalVoucher = res.data.MoreInfo;
          this.totalRecordVoucher = res.data.TotalRecord;
          this.totalPageVoucher = res.data.TotalPage;
          this.currentPageVoucher = res.data.CurrentPage;

          if (this.dataVoucher.length > 0) {
            this.dataVoucherFirst = this.dataVoucher[0].voucher_id;
          }

          this.$emit("cancelLoading");
          if (this.dataVoucher.length == 0) {
            this.dataVoucherFirst = "";
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },

    handleEdit(voucher_code) {
      this.typeOfForm = this.assetView.typeOfForm.editForm;
      this.voucherCode = voucher_code;
      this.isShowForm = true;
    },

    /**
     * Hàm xử lí sau khi chuyển trang
     * Created by: NDCHIEN(7/5/2023)
     */
    updateCurrentPage(currentPage) {
      this.currentPageVoucher = currentPage;
    },

    /**
     * Hàm lấy id của bảng voucher sau khi click phục vụ gọi api hiển thị bảng voucher detail
     * Created by: NDCHIEN(18/4/2023)
     */
    handleVoucherIdAfterClickRow(object) {
      this.idVoucher = object.voucher_id;
      if (object.row_index <= this.pageSizeVoucher) {
        this.activeRow = object.row_index - 1;
      }
      if (object.row_index > this.pageSizeVoucher) {
        this.activeRow =
          object.row_index -
          this.pageSizeVoucher * (this.currentPageVoucher - 1) -
          1;
      }
    },
  },
  data() {
    return {
      voucherTh: resource.voucherTh,
      currentPageVoucher: 1,
      pageSizeVoucher: 20,
      keyWord: "",
      voucherAPI: config.voucherAPI,
      assetFooter: resource.assetFooter,
      assetView: resource.assetView,
      activeRow: 0,
      totalPageVoucher: 0,
      totalRecordVoucher: 0,
      dataTotalVoucher: [],
      dataVoucher: [],
      dataVoucherFirst: {},
      isShowForm: false,
      voucherCode: "",
      typeOfForm: 0,
    };
  },
};
</script>

<style scoped>
@import url(./test.css);
</style>
