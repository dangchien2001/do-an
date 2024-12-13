<template>
    <div class="layer-voucher-detail">
      <div class="form-voucher-detail">
        <div class="form-header-voucher-detail">
          <div class="form-title-voucher-detail">Đánh giá lại tài sản cố định</div>
          <div class="blank"></div>
          <div class="exit-icon-form-detail">
            <div
              class="icon-exit"
              @click="
                () => {
                  this.$emit('exitForm');
                }
              "
            ></div>
            <MTooltip
              :text="'Đóng (Esc)'"
              class="exit-tooltip-form-detail"
            ></MTooltip>
          </div>
        </div>
        <div class="form-body-voucher-detail">
          <div class="title-form-body-voucher-detail">
            {{ voucherForm.subTitle.voucherInfomation }}
          </div>
          <div class="voucher-info">
            <div class="voucher-info-row-1">
              <div class="form-input-voucher-detail">
                <MInput
                  :fieldLabel="voucherForm.inputLabel.voucherCode"
                  :important="true"
                  v-model="voucher.voucher.voucher_code"
                  :isEmpty="isNullVoucherCode"
                  :code="isForcusVoucherCode"
                  @unForcus="
                    () => {
                      isForcusVoucherCode = false;
                    }
                  "
                  :maxlength="20"
                  :refProp="'focusMe'"
                  ref="focusMe"
                  :tabindex="1"
                ></MInput>
              </div>
              <div class="form-input-voucher-detail">
                <div class="text-input-voucher-detail">
                  Ngày chứng từ
                  <span class="important-input">*</span>
                </div>
                <MDatetime
                  v-model="voucher.voucher.voucher_date"
                  :key="componentKey"
                  :bottom="true"
                  v-outside="
                    () => {
                      this.$refs.datetime.hideDateSelectBox();
                    }
                  "
                  ref="datetime"
                  :tabindex="2"
                ></MDatetime>
              </div>
              <div class="form-input-voucher-detail">
                <div class="text-input-voucher-detail">
                  Ngày hạch toán
                  <span class="important-input">*</span>
                </div>
                <MDatetime
                  v-model="voucher.voucher.increment_date"
                  :key="componentKey"
                  :bottom="true"
                  v-outside="
                    () => {
                      this.$refs.datetime2.hideDateSelectBox();
                    }
                  "
                  ref="datetime2"
                  :tabindex="5"
                ></MDatetime>
              </div>
            </div>
  
            <div class="voucher-info-row-2">
              <div class="note-input-voucher-detail">
                <MInput
                  :fieldLabel="'Diễn giải'"
                  v-model="voucher.voucher.description"
                  :tabindex="8"
                  :maxlength="255"
                ></MInput>
              </div>
            </div>
            <div class="voucher-info-row-2" style="display: flex;">
              <div class="asset">
                <div class="w50" style="margin-right: 20px;">
                  <MCombobox
                  label="Mã tài sản"
                        :entity="'asset_code'"
                        :entityEmit="'asset_id'"
                        :positionAbsolute="true"
                        v-if="true"
                        v-model="voucher.voucher.asset_code"
                        :dataAvailable="assetForComboData"
                        @dataEmit="(dataEmit) => {voucher.voucher.asset_name = this.assetForComboData.filter(item => item.asset_id == dataEmit)[0].asset_name, voucher.voucher.asset_id = this.assetForComboData.filter(item => item.asset_id == dataEmit)[0].asset_id}"
                        style="z-index: 1000"
                    ></MCombobox>
                </div>
                <div class="w50" style="margin-left: 20px;">
                  <MInput
                  :fieldLabel="'Tên tài sản'"
                  v-model="voucher.voucher.asset_name"
                  :tabindex="8"
                  :maxlength="255"
                ></MInput>
                </div>
              </div>
              <div class="applyYear">
                <MInput
                  :fieldLabel="'Năm áp dụng'"
                  v-model="voucher.voucher.start_year"
                  :tabindex="8"
                  :maxlength="255"
                ></MInput>
              </div>  
            </div>
          </div>
          <div class="title-form-body-voucher-detail-2">
            {{ voucherForm.subTitle.voucherInformationDetail }}
          </div>
          <div class="voucher-info-with-table-and-filter">
            <div class="table-voucher-detail">


                    <TableCombo
                :style="'width: 100%'"
                :tableTh="voucherDetailThForm"
                :footer="'newFooter'"
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
                model="assetAdjustmentDetailForm"
                colspan="6"
                typeTable="table-container-non-border"
                :dataFooter="assetTransferFooter"
                :boldRow="true"
                :allowFunctionCol="false"
                :dataAvailable="dataForTable"
                
                @delete="deleteAsset"
                :allowPaging="false"
                :arrayTotal="arrayTotal"
                :allowCheckBox="false"
                @add="addAsset"
                @changeData="edit"
                @changeDataCombo="
                  (dataEmit, key, index, data) =>
                    changeDataCombo(dataEmit, key, index, data)
                "
              ></TableCombo>
            </div>
          </div>
        </div>
        <div class="form-footer-voucher-detail">
          <div class="left-button"></div>
          <div class="center-button">
              <MButton
                :text="'In báo cáo'"
                type="button-container"
                :tabindex="14"
                class="print-report"
                @click="() => {isShowReportList = !isShowReportList}"
              ></MButton>
          </div>
          <div class="submit-button">
            <MButton
              :text="voucherForm.buttonText.cancelForm"
              type="outline-button"
              @click="cancelAfterFindChange"
              :tabindex="13"
            ></MButton>
            <div class="accept-btn-container">
              <MButton
                :text="voucherForm.buttonText.accept"
                type="button-container"
                style="width: 100px; justify-content: center; margin-right: 17px"
                @click="handleSubmit"
                :tabindex="14"
              ></MButton>
              <MTooltip class="accept-btn-tooltip" text="Ctrl + s"></MTooltip>
            </div>
          </div>
  
          <div :tabindex="15" @focus="focusDefault" v-if="false"></div>
  
          <div class="report-container" v-if="isShowReportList">
              <div class="report-item" @click="printReport">Giấy ghi tăng tài sản</div>
          </div>
        </div>
      </div>
  
      <div class="layer-voucher-detail" v-if="isShowFormEditAsset">
        <MFormEditAsset
          @closeEditAssetForm="
            () => {
              isShowFormEditAsset = false;
              focusDefault();
            }
          "
          :assetCode="assetCodeForEdit"
          @editSuccess="handleAfterEditAssetSuccess"
          :voucherCost="arrayTotal[0]"
          :idVoucher="voucher.voucher.voucher_id"
          :assetObject="assetObject"
          @editAssetInAddVoucher="handleAfterEditAssetInAddVoucher"
          v-esc="
            () => {
              isShowFormEditAsset = false;
              focusDefault();
            }
          "
        ></MFormEditAsset>
      </div>
  
      <MPopup
        title=""
        :content="warning.channgeWarning"
        v-if="isChangeVoucher"
        @exitPopup="
          () => {
            this.isChangeVoucher = false;
          }
        "
        @save="handleSubmit"
        @notSave="calcCostVoucherAfterCancelUpdate"
        type="warning"
        typeButton="fullOption"
      ></MPopup>
    </div>
  </template>
  
  <script>
  import MInput from "@/components/MInput/MInput.vue";
  import MDatetime from "@/components/MDatetime/MDatetime.vue";
  // import MInputWithIcon from '@/components/MInput/MInputWithIcon.vue';
  import MButton from "@/components/MButton/MButton.vue";
  // import MTable from '@/components/MTable/MTable.vue';
  import resource from "@/js/resource";
  import config from "@/js/config";
  import comon from "@/js/comon";
  import MFormEditAsset from "../formEditAsset/MFormEditAsset.vue";
  import MPopup from "@/components/MPopup/MPopup.vue";
  import MTooltip from "@/components/MTooltip/MTooltip.vue";
  import TableCombo from "@/components/MTableCombo/MTableCombo.vue";
  import MCombobox from "@/components/MInput/MCombobox.vue";

  import axios from "axios";
  export default {
    components: {
      MInput,
      MDatetime,
      /* MInputWithIcon,*/ MButton,
      /*MTable,*/ MFormEditAsset,
      MPopup,
      MTooltip,
      TableCombo,
      MCombobox
    },
    props: {
      dataAvailable: Array,
      // biến lưu loại form
      typeOfForm: Number,
      // biến lưu mã chứng từ
      voucherCode: String,
    },
    /**
     * Thay đổi form dựa theo props typeOfForm
     * Created by: NDCHIEN(26/4/2023)
     * Modified by: NDCHIEN(26/4/2023)
     */
    async created() {
      // gọi maxcode nếu là form thêm
      if (this.typeOfForm == this.voucherForm.typeOfForm.addForm) {
        this.titleForm = this.voucherForm.titleForm.addVoucherTitle;
        this.getMaxCode();
        // forcus input đầu tiên
        this.isForcusVoucherCode = true;

        this.dataForTable = this.configDataForDetail([{
          new_amount: 0,
          amount: 0,
          new_depreciation_value: 0,
          depreciation_value: 0,
          new_accumulate_depreciation: 0,
          accumulate_depreciation: 0,
          new_monthly_depreciation_value: 0,
          monthly_depreciation_value: 0,
          new_wastage_rate: 0,
          wastage_rate: 0,
          new_remaining_value: 0,
          remaining_value: 0,
          new_remaining_use_time: 0,
          remaining_use_time: 0,
          new_by_the_year: 0,
          by_the_year: 0,
          new_quantity: 0,
          quantity: 0
        }]);
      }
      // gọi api lấy chứng từ nếu là form sửa
      if (this.typeOfForm == this.voucherForm.typeOfForm.editForm) {
        // forcus input đầu tiên
        this.isForcusVoucherCode = true;
        this.titleForm = this.voucherForm.titleForm.editVoucherTitle;
        await this.selectVoucherByVoucherCode(this.voucherCode);
      }

      await this.assetForCombo();
    },
  
    mounted() {
      this.focusDefault();
    },
  
    /**
     * Làm rỗng mảng dữ liệu dùng để truyền cho danh sách tài sản chưa active sau khi hủy form
     * Created by: NDCHIEN(26/4/2023)
     */
    unmounted() {
      this.$emit("dataForListAssetNoActive", []);
      this.$emit("assetForNoActive", []);
    },
    methods: {
      async assetForCombo() {
        axios
          .get("https://localhost:7210/api/Assets")
          .then(res => {
            
            this.assetForComboData = res.data;
           })
      },

      async printReport() {
        const url = await comon.printReport();
        this.$emit('printReport', url);
      },
  
      changeDataCombo(dataEmit, key, index, data) {
        console.log(dataEmit, key, index, data);
        if (key == "Asset") {
          data[index].asset_id = dataEmit.asset_id;
          data[index].asset_name = dataEmit.asset_name;
          data[index].description = 'Ghi tăng tài sản ' + dataEmit.asset_name;     
        }
        if(key == "Department") {     
          data[index].department_id = dataEmit.department_id;
        }
        if(key == "AccountSystemDebit") {     
          data[index].account_system_debit = dataEmit.account_number;
        }
        if(key == "AccountSystemCredit") {     
          data[index].account_system_credit = dataEmit.account_number;
        }
        this.dataForTable = data;
      },
      edit(datas) {
        this.dataForTable = datas.map(item => this.formatForEdit(item));
        //this.totalValue(this.dataForTable);
      },
  
      addAsset(datas) {
        this.dataForTable = datas;
        //this.totalValue(this.dataForTable);
      },
      deleteAsset(datas) {
        this.dataForTable = datas;
        //this.totalValue(this.dataForTable);
      },
      /**
       * Hàm focus mặc định
       * Created by: NDCHIEN(15/5/2023)
       */
      focusDefault() {
        this.$refs.focusMe.$refs.focusMe.focus();
      },
      /**
       * Hàm xử lý lưu bằng ctrl + s
       * Created by: NDCHIEN(12/5/2023)
       */
      handleSaveByKeyBoard() {
        if (this.isShowFormEditAsset == false) {
          this.handleSubmit();
        }
      },
      /**
       * Hàm sửa chứng từ thành ban đầu sau khi phát hiện sự thay đổi rồi bấm hủy
       * Created by: NDCHIEN(6/5/2023)
       */
      cancelAfterFindChange() {
        var isEqual = this.shallowObjectEqual(this.voucher, this.voucherClone);
        if (
          isEqual &&
          this.voucherCodeClone == this.voucher.voucher.voucher_code &&
          this.incrementDateClone == this.voucher.voucher.increment_date &&
          this.voucherDateClone == this.voucher.voucher.voucher_date
        ) {
          this.$emit("exitForm");
        }
        if (
          !isEqual ||
          this.voucherCodeClone != this.voucher.voucher.voucher_code ||
          this.incrementDateClone != this.voucher.voucher.increment_date ||
          this.voucherDateClone != this.voucher.voucher.voucher_date
        ) {
          this.isChangeVoucher = true;
        }
        if (this.typeOfForm == this.voucherForm.typeOfForm.addForm) {
          this.$emit("exitForm");
        }
      },
  
      /**
       * Tính lại nguyên giá chứng từ sau khi hủy update chứng từ
       * Created by: NDCHIEN(6/5/2023)
       */
      calcCostVoucherAfterCancelUpdate() {
        var voucherClone = this.voucherClone;
        axios
          .put(this.voucherAPI.updateVoucher(voucherClone.voucher.voucher_id), {
            voucher: {
              row_index: 0,
              voucher_id: voucherClone.voucher.voucher_id,
              voucher_code: this.voucherCodeClone,
              voucher_date: this.voucherDateClone,
              increment_date: this.incrementDateClone,
              description: voucherClone.voucher.description,
              price: voucherClone.voucher.price,
              created_by: "",
              created_date: new Date(),
              modified_by: "",
              modified_date: new Date(),
            },
            asset_code_active: voucherClone.assetIds,
            asset_code_no_active: this.assetForNoActive.map(
              (item) => item.asset_id
            ),
            asset_ids: voucherClone.assetIds,
          })
          .then(() => {
            this.$emit("exitFormWithChange");
          });
      },
  
      /**
       * Hàm so sánh hai đổi tượng (copy trên mạng)
       * Created by: NDCHIEN(6/5/2023)
       */
      shallowObjectEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
  
        if (keys1.length !== keys2.length) {
          return false;
        }
  
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
  
        return true;
      },
  
      /**
       * Hàm làm thay đổi mảng tài sản truyền vào table ở phía frontend sau khi sửa 1 tài sản thành công
       * Created by: NDCHIEN(5/5/2023)
       */
      handleAfterEditAssetInAddVoucher(assetObject) {
        this.arrayForTableFixed.splice(this.assetIndex, 1, assetObject.Data);
        this.isShowFormEditAsset = false;
        //this.totalValue(this.dataForTable);
        this.$emit("editSuccess");
      },
      /**
       * Hàm thực hiện sau khi bấm nút sửa tài sản
       * Created by: NDCHIEN(5/5/2023)
       */
      editAsset(data) {
        this.isShowFormEditAsset = true;
        this.assetCodeForEdit = data;
        if (this.typeOfForm == this.voucherForm.typeOfForm.addForm) {
          var assetObject = this.arrayForTableFixed.filter(
            (item) => item.asset_code == data
          );
          this.assetObject = assetObject;
          this.assetIndex = this.arrayForTableFixed.indexOf(this.assetObject[0]);
        }
      },
      /**
       * Hàm xử lý sau khi sửa tài sản thành công
       * Created by: NDCHIEN(5/5/2023)
       */
      handleAfterEditAssetSuccess(asset) {
        if (this.typeOfForm == this.voucherForm.typeOfForm.editForm) {
          this.isShowFormEditAsset = false;
          var assetForFilter = this.dataForTable.filter(
            (item) => item.asset_code == asset.Data.asset_code
          )[0];
          this.dataForTable.splice(
            this.dataForTable.indexOf(assetForFilter),
            1,
            asset.Data
          );
          //this.totalValue(this.dataForTable);
          this.$emit("editSuccess", this.voucher.voucher.voucher_id);
        }
      },
      /**
       * Hàm xử lý nút đồng ý dựa trên kiểu form
       * Created by: NDCHIEN(27/4/2023)
       */
      handleSubmit() {
        if (this.typeOfForm == this.voucherForm.typeOfForm.addForm) {
          this.insertVoucher();
        }
        if (this.typeOfForm == this.voucherForm.typeOfForm.editForm) {
          this.editVoucher();
        }
      },
      /**
       * Hàm sửa chứng từ
       * Created by: NDCHIEN(27/4/2023)
       * Modified by: NDCHIEN(28/4/2023)
       */
      editVoucher() {
        var validateResult = this.validate();
        var result = {
          voucher: {
            ref_id: this.voucher.voucher.voucher_id,
            ref_no: this.voucher.voucher.voucher_code,
            ref_date: this.voucher.voucher.voucher_date,
            asset_id: this.voucher.voucher.asset_id,
            asset_code: this.voucher.voucher.asset_code,
            asset_name: this.voucher.voucher.asset_name,
            description: this.voucher.voucher.description,
            posted_date: this.voucher.voucher.posted_date,
            start_year: this.voucher.voucher.start_year,
          },
          voucherDetails: this.formatForSave(this.dataForTable, this.defaultData[0])
        }
        if (validateResult) {
          axios
            .put(this.voucherAPI.updateVoucher(this.voucher.voucher.voucher_id), result)
            .then(() => this.$emit("closeForm", this.formDetail.editSuccess))
            .catch((res) => this.$emit("showPopupError", res.response.data));
        }
      },

      formatForSave(data, defaultData) {
        return [
          {
            row_index: 0,
            ref_detail_id: defaultData.ref_detail_id,
            ref_id: defaultData.ref_id,
            amount: data[0].info,
            new_amount: data[0].new,
            depreciation_value: data[1].info,
            new_depreciation_value: data[1].new,
            accumulate_depreciation: data[2].info,
            new_accumulate_depreciation: data[2].new,
            remaining_value: data[5].info,
            new_remaining_value: data[5].new,
            wastage_rate: data[4].info,
            new_wastage_rate: data[4].new,
            monthly_depreciation_value: data[3].info,
            new_monthly_depreciation_value: data[3].new,
            remaining_use_time: data[6].info,
            new_remaining_use_time: data[6].new,
            by_the_year: data[7].info,
            new_by_the_year: data[7].new,
            quantity: data[8].info,
            new_quantity: data[8].new,
          }
        ]
      },

      /**
       * Hàm xóa tài sản ở table trong form thêm, sửa chứng từ
       * Created by: NDCHIEN(25/4/2023)
       * @param {*} asset_code
       */
      deleteAssetFromFormDetail(asset_code) {
        // Hàm này loại bỏ đối tượng được xóa khỏi mảng dataForFormDetail(đây là mảng chứa tài sản bị loại khi gọi api tài sản chưa active)
        this.assetForNoActive = this.assetForNoActive.concat(
          this.dataForTable.filter((item) => item.asset_code == asset_code)
        );
        this.dataForTable = this.dataForTable.filter(
          (item) => item.asset_code !== asset_code
        );
        this.$emit("dataForListAssetNoActive", this.dataForTable);
        this.$emit("dataForCountAvailable", this.dataForTable);
        //this.totalValue(this.dataForTable);
      },
      /**
       * Hàm dùng để render datetime
       * Created by: NDCHIEN(26/4/2023)
       */
      forceRerender() {
        return ++this.componentKey;
      },
      /**
       * Hàm gọi API lấy dữ liệu chi tiết chứng từ theo mã chứng từ
       * Created by: NDCHIEN(26/4/2023)
       */
      async selectVoucherByVoucherCode(voucher_code) {
        this.$emit("startLoading");
        axios
          .get(this.voucherAPI.getVoucherByCode(voucher_code))
          .then((res) => {
            this.voucher = {
              assetIds: [],
              voucher: {
                row_index: 0,
                voucher_id: res.data.voucher.ref_id,
                voucher_code: res.data.voucher.ref_no,
                voucher_date: res.data.voucher.ref_date,
                increment_date: res.data.voucher.increment_date,
                description: res.data.voucher.description,
                asset_id: res.data.voucher.asset_id,
                asset_code: res.data.voucher.asset_code,
                asset_name: res.data.voucher.asset_name,
                start_year: res.data.voucher.start_year,
                posted_date: res.data.voucher.posted_date,
              },
            };
            this.$emit("dataForCountAvailable", this.configDataForDetail(res.data.voucherDetails));
            this.defaultData = res.data.voucherDetails;
            //this.totalValue(this.dataForTable);
            this.$emit("cancelLoading");
            this.forceRerender();
          })
          .catch((res) => console.log(res));
      },
      /**
       * Hàm validate rồi thêm mới chứng từ
       * Created by: NDCHIEN(24/4/2023)
       * Modified by: NDCHIEN(25/4/2023)
       */
      insertVoucher() {
        var validateResult = this.validate();
        var result = {
          voucher: {
            ref_id: this.voucher.voucher.voucher_id,
            ref_no: this.voucher.voucher.voucher_code,
            ref_date: this.voucher.voucher.voucher_date,
            asset_id: this.voucher.voucher.asset_id,
            asset_code: this.voucher.voucher.asset_code,
            asset_name: this.voucher.voucher.asset_name,
            description: this.voucher.voucher.description,
            posted_date: this.voucher.voucher.increment_date,
            start_year: this.voucher.voucher.start_year,
          },
          voucherDetails: this.formatForSave(this.dataForTable, this.defaultData[0])
        }
        if (validateResult) {
          axios
            .post(this.voucherAPI.insertVoucher(), result)
            .then(() => this.$emit("closeForm", this.formDetail.addSuccess))
            .catch((res) => this.$emit("showPopupError", res.response.data));
        }
      },

      formatForEdit(data) {
        return {
          title: data.title,
          info: data.info,
          new: data.new,
          final: data.new - data.info,
        };
      },

      configDataForDetail(dataBefore) {
            var data = {...dataBefore[0]}

            return [
                {
                    title: 'Nguyên giá',
                    info: data.amount ?? 0,
                    new: data.new_amount ?? 0,
                    final: data.new_amount ?? 0 - data.amount ?? 0
                },
                {
                    title: 'Giá trị hao mòn',
                    info: data.depreciation_value ?? 0,
                    new: data.new_depreciation_value ?? 0,
                    final: data.new_depreciation_value ?? 0 - data.depreciation_value ?? 0
                },
                {
                    title: 'Hao mòn/Khấu hao lũy kế',
                    info: data.accumulate_depreciation ?? 0,
                    new: data.new_accumulate_depreciation ?? 0,
                    final: data.new_accumulate_depreciation ?? 0 - data.accumulate_depreciation ?? 0
                },               
                {
                    title: 'Giá trị khấu hao tháng/quý',
                    info: data.monthly_depreciation_value ?? 0,
                    new: data.new_monthly_depreciation_value ?? 0,
                    final: data.new_monthly_depreciation_value ?? 0 - data.monthly_depreciation_value ?? 0
                },
                {
                    title: 'Tỷ lệ hao mòn',
                    info: data.wastage_rate ?? 0,
                    new: data.new_wastage_rate ?? 0,
                    final: data.new_wastage_rate ?? 0 - data.wastage_rate ?? 0
                },               
                {
                    title: 'Giá trị còn lại',
                    info: data.remaining_value ?? 0,
                    new: data.new_remaining_value ?? 0,
                    final: data.new_remaining_value ?? 0 - data.remaining_value ?? 0
                },
                {
                    title: 'Số năm còn lại',
                    info: data.remaining_use_time ?? 0,
                    new: data.new_remaining_use_time ?? 0,
                    final: data.new_remaining_use_time ?? 0 - data.remaining_use_time ?? 0
                },
                {
                    title: 'Đến năm',
                    info: data.by_the_year ?? 0,
                    new: data.new_by_the_year ?? 0,
                    final: data.new_by_the_year ?? 0 - data.by_the_year ?? 0
                },
                {
                    title: 'Số lượng',
                    info: data.quantity ?? 0,
                    new: data.new_quantity ?? 0,
                    final: data.new_quantity ?? 0 - data.quantity ?? 0
                },
            ]
        },
  
      /**
       * Hàm gọi API lấy mã lớn nhất
       * Created by: NDCHIEN(24/4/2023)
       */
      getMaxCode() {
        this.$emit("startLoading");
        axios.get(this.voucherAPI.getMaxCode()).then((res) => {
          this.voucher.voucher.voucher_code = res.data;
          this.$emit("cancelLoading");
        });
      },
  
      /**
       * Hàm format lại data được truyền vào bảng tài sản (format chỗ STT)
       * Created by: NDCHIEN(25/4/2023)
       */
      formatAssetData(asset, index) {
        var row_index = index + 1;
        return {
          row_index: row_index,
          asset_id: asset.asset_id,
          asset_code: asset.asset_code,
          asset_name: asset.asset_name,
          department_id: asset.department_id,
          department_name: asset.department_name,
          account_system_debit: asset.account_system_debit,
          account_system_credit: asset.account_system_credit,
          description: asset.description,
          cost: asset.cost,
          depreciation_value: asset.depreciation_value,
          residual_value: asset.residual_value,
        };
      },
  
      /**
       * Hàm filter tài sản
       * Created by: NDCHIEN(25/4/2023)
       */
      filterAsset() {
        this.$emit("startLoading");
        this.dataForTable = this.dataAvailable.filter(
          (item) =>
            item.asset_code.toLowerCase().includes(this.keyWord.toLowerCase()) ||
            item.asset_name.toLowerCase().includes(this.keyWord.toLowerCase())
        );
        this.$emit("cancelLoading");
      },
  
      /**
       * Hàm validate
       * Created by: NDCHIEN(25/4/2023)
       */
      validate() {
        // mã chứng từ không được để trống
        if (this.voucher.voucher.voucher_code.length < 1) {
          this.$refs.focusMe.$refs.focusMe.focus();
          this.$emit("showPopupError", {
            UserMsg: this.formDetail.validate.emptyCode,
          });
          return false;
        }
        // phải chọn ít nhất 1 tài sản trong 1 chứng từ
        else if (this.dataForTable.length < 1) {
          this.$emit("showPopupError", {
            UserMsg: "Nhập ít nhất 1 tài sản",
          });
          return false;
        } else return true;
      },
  
      /**
       * Hàm tính tổng các trường
       * Created by: NDCHIEN(26/4/2023)
       */
      totalValue(listAsset) {
        var totalCost = 0;
        listAsset.forEach((item) => (totalCost += item.cost || 0));
        var totalDepreciationValue = 0;
        listAsset.forEach(
          (item) => (totalDepreciationValue += item.depreciation_value || 0)
        );
        var totalResidualValue = 0;
        listAsset.forEach(
          (item) => (totalResidualValue += item.residual_value || 0)
        );
        this.arrayTotal = [0, 0, 0];
        this.voucher.voucher.price = totalCost;
      },
    },
    watch: {
      /**
       * Lấy dữ liệu mảng từ bảng chọn tài sản chưa active để tính tổng footer và format lại (chỉ lấy mảng chứa id)
       * Created by: NDCHIEN(19/4/2023)
       * Modified by: NDCHIEN(25/4/2023)
       */
       dataAvailable: function (newValue) {
        this.voucher.assetIds = newValue.map((item) => item.asset_id);
        if (this.index == 0) {
          this.voucherClone = { ...this.voucher };
          this.voucherCodeClone = this.voucher.voucher.voucher_code;
          this.incrementDateClone = this.voucher.voucher.increment_date;
          this.voucherDateClone = this.voucher.voucher.voucher_date;
          this.index++;
        }
        //this.totalValue(newValue);
        if (newValue.length < 1) {
          this.dataForTable = this.dataForTable.concat(newValue);
        } else {
          this.dataForTable = newValue;
        }
        this.$emit("dataForListAssetNoActive", this.dataForTable);
        this.arrayForTableFixed = newValue;
  
        this.assetForNoActive = this.assetForNoActive.filter((item) => {
          return !newValue.find((item2) => {
            return item.asset_code === item2.asset_code;
          });
        });
      },
      
  
      /**
       * Tự động tính lại tổng sau khi chọn tài sản ở form sửa, gán giá trị mới cho biến arrayForTableFixed
       * Created by: NDCHIEN(26/4/2023)
       * Modified by:
       * @param {*} newValue
       */
      // dataForTable: function (newValue) {
      //   //this.totalValue(newValue);
      // },
  
      /**
       * Hiển thị tất cả tài sản sau khi xóa hết keyWord
       * Created by: NDCHIEN(25/4/2023)
       */
      keyWord: function (newValue) {
        if (newValue.length == 0) {
          this.filterAsset();
        }
      },
  
      /**
       * Hàm check trống mã chứng từ ở giao diện
       * Created by: NDCHIEN(26/4/2023)
       */
      voucher: {
        handler(newValue) {
          if (newValue.voucher.voucher_code.length < 1) {
            this.isNullVoucherCode = true;
          } else {
            this.isNullVoucherCode = false;
          }
        },
        deep: true,
      },
  
      /**
       * Hàm xóa tài sản trùng khỏi mảng assetForNoActive
       * Created by: NDCHIEN(27/4/2023)
       */
      assetForNoActive: function (newValue) {
        const unique2 = newValue.filter((obj, index) => {
          return (
            index ===
            newValue.findIndex(
              (o) =>
                obj.asset_id === o.asset_id && obj.asset_code === o.asset_code
            )
          );
        });
        this.assetForNoActive = unique2;
        if (this.typeOfForm == this.voucherForm.typeOfForm.editForm) {
          this.$emit("assetForNoActive", this.assetForNoActive);
        }
      },
    },
    data() {
      return {
        formDetail: resource.formDetail,
        voucherAPI: config.assetAdjustmentAPI,
        voucherTh: resource.voucherTh,
        voucherDetailThForm: resource.assetAdjustmentDetailTh,
        voucherForm: resource.voucherForm,
        // biến hứng data được truyền tù ngoài vào
        dataForTest: [],
        // đối tượng voucher phục vụ xóa, sửa
        voucher: {
          assetIds: [],
          voucher: {
            row_index: 0,
            voucher_id: "00000000-0000-0000-0000-000000000000",
            voucher_code: "",
            voucher_date: "",
            increment_date: "",
            description: "",
            price: 0,
            created_by: "",
            created_date: new Date(),
            modified_by: "",
            modified_date: new Date(),
          },
        },
        // mảng lưu data được truyền vào từ prop
        dataForTable: [],
        // biến lưu từ khóa tìm kiếm
        keyWord: "",
        // biến lưu trạng thái trống mã chứng từ
        isNullVoucherCode: false,
        // biến lưu title form tương ứng với loại form
        titleForm: "",
        // biến phục vụ rende datetime
        componentKey: 1,
        // biến lưu mảng chứa các giá trị cho footer
        arrayTotal: [0, 0, 0],
        // biến lưu mảng cố định phục vụ chức năng phân trang
        arrayForTableFixed: [],
        // mảng chứa tài sản dùng để hủy active trong form sửa
        assetForNoActive: [],
        // biến lưu trạng thái form sửa tài sản
        isShowFormEditAsset: false,
        // biến lưu mã tài sản sau khi bấm sửa
        assetCodeForEdit: "",
        // biến lưu đối tượng tài sản sau khi bấm sửa ở form thêm chứng từ
        assetObject: [],
        // biến lưu vị trí của tài sản trong mảng dành cho table sau khi bấm sửa
        assetIndex: 0,
        // biến lưu giá trị ban đầu của chứng từ trước khi sửa phục vụ backup
        voucherClone: {},
  
        voucherCodeClone: "",
        incrementDateClone: "",
        voucherDateClone: "",
        // biến dùng để tạo điều kiện clone voucher 1 lần
        index: 0,
        // biến ẩn hiện popup sau khi hủy sửa chứng từ
        isChangeVoucher: false,
        // biến lưu resource
        warning: resource.warning,
        // biến lưu trạng thái forcus input đầu tiên
        isForcusVoucherCode: false,
  
        isShowReportList: false,
  
        assetForComboData: [],

        defaultData: [{
        }]
      };
    },
  };
  </script>
  
  <style scoped>
  @import url(./AssetAdjustmentDetail.css);
  </style>
  