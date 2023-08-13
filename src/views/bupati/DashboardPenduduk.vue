<template>
  <div>
    <a-row :gutter="10" align="middle">
      <a-col :span="24" :lg="16" class="mb-24">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ padding: 10 }"
        >
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="24" :md="16">
                <h6 class="font-semibold m-0">Detail Data Penduduk</h6>
              </a-col>
              <a-col
                :span="24"
                :md="8"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                "
              >
                <a-input-search
                  class="header-search"
                  v-model="filter"
                  v-on:input="handleTableChange"
                  placeholder="Pencarian"
                >
                </a-input-search>
              </a-col>
            </a-row>
          </template>
          <a-table
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            :rowKey="(r) => r.nik"
            :filter="filter"
            @change="handleTableChange"
          >
            <template v-slot>
              <a-table-column key="nik" data-index="nik">
                <span slot="title">NIK</span>
              </a-table-column>
              <a-table-column key="nama_lgkp" data-index="nama_lgkp">
                <span slot="title">Nama Lengkap</span>
              </a-table-column>
              <a-table-column key="jenis_kelamin" data-index="jenis_kelamin">
                <span slot="title">Jenis Kelamin</span>
              </a-table-column>
              <a-table-column key="agama" data-index="agama">
                <span slot="title">Agama</span>
              </a-table-column>
              <a-table-column key="alamat" data-index="alamat">
                <span slot="title">Alamat</span>
              </a-table-column>

              <!-- Start Button Detail -->
              <!-- <a-table-column key="action" title="Action">
                <template slot-scope="text, record">
                  <span>
                    <a-button type="primary" @click="goToDetail(record)" size="default">
                      Detail
                    </a-button>
                  </span>
                </template>
              </a-table-column> -->
              <!-- End Button Detail -->
            </template>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="24" :md="8" :xl="8" class="mb-20">
        <ChartsPenduduk
          v-if="!loading"
          :totalPd="totalPenduduk"
          :totalPdLaki="totalPendudukLaki"
          :totalPdPerempuan="totalPendudukPerempuan"
        ></ChartsPenduduk>
      </a-col>
      <a-col :span="12" :xl="8" class="mb-20">
        <WidgetCounter
          title="PENDUDUK"
          :value="totalPenduduk"
          icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zm311.1 823.1c-40.4 40.4-87.5 72.2-139.9 94.3C629 940.4 571.4 952 512 952s-117-11.6-171.2-34.5c-52.4-22.2-99.4-53.9-139.9-94.3-40.4-40.4-72.2-87.5-94.3-139.9C83.6 629 72 571.4 72 512s11.6-117 34.5-171.2c22.2-52.4 53.9-99.4 94.3-139.9 40.4-40.4 87.5-72.2 139.9-94.3C395 83.6 452.6 72 512 72s117 11.6 171.2 34.5c52.4 22.2 99.4 53.9 139.9 94.3 40.4 40.4 72.2 87.5 94.3 139.9C940.4 395 952 452.6 952 512s-11.6 117-34.5 171.2c-22.2 52.4-53.9 99.5-94.4 139.9zM640.3 565.2c-19.9 0-36 16.1-36 36 0 50.9-41.4 92.3-92.3 92.3s-92.3-41.4-92.3-92.3c0-19.9-16.1-36-36-36s-36 16.1-36 36c0 90.6 73.7 164.3 164.3 164.3s164.3-73.7 164.3-164.3c0-19.9-16.1-36-36-36zM194.2 382.4a60 60 0 1 0 120 0 60 60 0 1 0-120 0zm515.3 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0z'/></svg>"
          status=""
        ></WidgetCounter>
      </a-col>
      <a-col :span="12" :xl="8" class="mb-20">
        <WidgetCounter
          title="PRIA"
          :value="totalPendudukLaki"
          icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M384 320C207.3 320 64 463.3 64 640s143.3 320 320 320 320-143.3 320-320-143.3-320-320-320zm0 568c-137 0-248-111-248-248s111-248 248-248 248 111 248 248-111 248-248 248zM949.5 74.5C942.9 68 933.9 64 924 64H548c-19.9 0-36 16.1-36 36s16.1 36 36 36h340v340c0 19.9 16.1 36 36 36s36-16.1 36-36V100c0-9.9-4-18.9-10.5-25.5z'/></svg>"
          status=""
        ></WidgetCounter>
      </a-col>
      <a-col :span="12" :xl="8" class="mb-20">
        <WidgetCounter
          title="WANITA"
          :value="totalPendudukPerempuan"
          icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 576c159.1 0 288-128.9 288-288S671.1 0 512 0 224 128.9 224 288s128.9 288 288 288zm0-504c119.3 0 216 96.7 216 216s-96.7 216-216 216-216-96.7-216-216S392.7 72 512 72zm348 568H164c-19.9 0-36 16.1-36 36s16.1 36 36 36h312v276c0 19.9 16.1 36 36 36s36-16.1 36-36V712h312c19.9 0 36-16.1 36-36s-16.1-36-36-36z'/></svg>"
          status=""
        ></WidgetCounter>
      </a-col>
      <a-col :span="24" :lg="16">
        <a-row type="flex" :gutter="10"> </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
//mycharts
import ChartsPns from "../../components/MyCharts/ChartPns";
import ChartsPns1 from "../../components/MyCharts/ChartPns1";
import ChartsPenduduk from "../../components/MyCharts/ChartPenduduk";
import ChartGolongan from "../../components/MyCharts/ChartGolongan";
// Bar chart for "Active Users" card.
import CardBarChart from "../../components/Cards/CardBarChart";

// Line chart for "Sales Overview" card.
import CardLineChart from "../../components/Cards/CardLineChart";

// Counter Widgets
import WidgetCounter from "../../components/Widgets/WidgetCounter";

// "Projects" table component.
import CardProjectTable from "../../components/Cards/CardProjectTable";

// Order History card component.
import CardOrderHistory from "../../components/Cards/CardOrderHistory";

// Information card 1.
import CardInfo from "../../components/Cards/CardInfo";

import CardInfo2 from "../../components/Cards/CardInfo2";
const stats = [];

// "Projects" table list of columns and their properties.
const tableColumns = [];

// "Projects" table list of rows and their properties.
const tableData = [];

export default {
  components: {
    ChartsPns,
    ChartsPns1,
    ChartsPenduduk,
    ChartGolongan,
    CardBarChart,
    CardLineChart,
    WidgetCounter,
    CardProjectTable,
    CardOrderHistory,
    CardInfo,
    CardInfo2,
  },
  data() {
    return {
      loading: false,
      tableData,
      tableColumns,
      stats,
      totalPns: 0,
      totalPenduduk: 0,
      total: 0,
      listProfesi: [],
      profesi: null,
      totalPerempuan: 0,
      totalPendudukPerempuan: 0,
      totalLk: 0,
      totalPendudukLaki: 0,
      data: [],
      pagination: {},
      filter: "",
      columns: [
        {
          title: "No. KK",
          dataIndex: "no_kk",
        },
        {
          title: "NIK",
          dataIndex: "nik",
        },
        {
          title: "Nama Lengkap",
          dataIndex: "nama_lgkp",
        },
        {
          title: "Jenis Kelamin",
          dataIndex: "jenis_kelamin",
        },
        {
          title: "agama",
          dataIndex: "agama",
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "operation" },
        },
      ],
      loading: true,
    };
  },
  async created() {
    await this.getPenduduk();
    await this.getData();
  },
  methods: {
    handleTableChange(pagination, filter) {
      const pager = { ...this.pagination };
      this.pagination = pager;

      this.getData({
        page: pagination.current,
        perPage: pagination.pageSize,
        filter: this.filter,
      });
    },
    async getPenduduk() {
      this.$loading(true);
      this.loading = true;
      try {
        this.totalPenduduk = await this.$axios
          .get(`countdatapenduduk/get-data`)
          .then((r) => r.data);
        this.totalPendudukLaki = await this.$axios
          .get(`countdatapenduduk/get-data-laki-laki/LAKI-LAKI`)
          .then((r) => r.data);
        this.totalPendudukPerempuan = await this.$axios
          .get(`countdatapenduduk/get-data-perempuan/PEREMPUAN`)
          .then((r) => r.data);
        this.$loading(false);
        this.loading = false;
      } catch (err) {
        this.$loading(false);
        this.loading = false;
        this.$commonErrorNotif();
      }
    },
    getData(params = { page: 1, perPage: 10, filter: this.filter }) {
      this.loading = true;
      this.$axios
        .get(`/datapenduduk/get-all-datapenduduk`, { params })
        .finally(() => {
          this.loading = false;
        })
        .then((res) => {
          console.log(res);
          if (this.$parseResponse(res.data)) {
            this.data = res.data.result;
            const pagination = {
              page: res.data.page,
              total: res.data.count,
              filter: res.data.filter,
            };
            this.pagination = pagination;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    // goToDetail (record) {
    //   this.$router.push({name: 'detailDataPendudukBupati', params: {id: record._id}})
    // }
  },
};
</script>

<style lang="scss"></style>
