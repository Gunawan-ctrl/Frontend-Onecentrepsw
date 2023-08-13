<template>
	<div>
		<a-row :gutter="24" type="flex" align="stretch" >
			<a-col :span="24" :md="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row :gutter="20" type="flex" align="middle">
              <a-col :span="24" :md="16">
                <p>Program Imunisasi /<span style="color: #1890FF">BIAN 2022</span></p>
              </a-col>
              <!-- <a-col :span="24" :md="6" style="display: flex; align-items: center; justify-content: flex-end">
                <a-button type="primary" block size="small" @click="">
                  Tambah Anak
                </a-button>
              </a-col> -->
              <!-- <a-col :span="24" :md="6" style="display: flex; align-items: center; justify-content: flex-end">
                <a-button type="dashed" style="color: blue;" block size="small" @click="">
                  Export CSV
                </a-button>
              </a-col> -->
              <a-col :span="24" :md="8" style="display: flex; align-items: center; justify-content: flex-end">
                <a-input-search class="header-search" v-model="filter" v-on:input="handleTableChange" placeholder="Pencarian">
                </a-input-search>
              </a-col>
            </a-row>

          </template>
            
          <a-table
            :data-source="data"
            :pagination= "pagination"
            :loading="loading"
            :rowKey="r => r.nik"
            :filter="filter"
            @change="handleTableChange"
          >
          <template v-slot>
            <a-table-column key="nik" data-index="nik">
              <span slot="title">NIK</span>
            </a-table-column>
            <a-table-column key="name" data-index="name">
              <span slot="title">Nama Anak</span>
            </a-table-column>
            <a-table-column key="gender" data-index="gender">
              <span slot="title">Jenis Kelamin</span>
            </a-table-column>
            <a-table-column key="birth_date" data-index="birth_date">
              <span slot="title">Tanggal Lahir</span>
            </a-table-column>
            <!-- <a-table-column key="" data-index="">
              <span slot="title">Umur</span>
            </a-table-column> -->
            <a-table-column key="parent_name" data-index="parent_name">
              <span slot="title">Nama Ibu</span>
            </a-table-column>
            <a-table-column key="province.name" data-index="province.name">
              <span slot="title">Provinsi</span>
            </a-table-column>
            <!-- <a-table-column key="city.name" data-index="city.name">
              <span slot="title">Kota</span>
            </a-table-column> -->
            <!-- <a-table-column key="district.name" data-index="district.name">
              <span slot="title">Kecamatan</span>
            </a-table-column>
            <a-table-column key="subDistrict.name" data-index="subDistrict.name">
              <span slot="title">Kelurahan</span>
            </a-table-column> -->

            <!-- Start Button Detail -->
            <!-- <a-table-column align="center" key="action" title="Action">
              <template slot-scope="text, record">
                <div class="justify-center">
                  <a-button type="primary" @click="goToDetail(record)">
                    Detail
                  </a-button>
                </div>
              </template>
            </a-table-column> -->
            <!-- End Button Detail -->
          </template>
          </a-table>
        
        </a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import axioss from 'axios'
export default ({
  data() {
    return {
      data: [],
      pagination: {},
      filter: '',
      columns : [
        {
          title: 'NIK',
          dataIndex: 'nik',
        },
        {
          title: 'Nama Anak',
          dataIndex: 'name',
        },
        {
          title: 'Jenis Kelamin',
          dataIndex: 'gender',
        },
        {
          title: 'Tanggal Lahir',
          dataIndex: 'birth_date',
        },
        {
          title: 'Umur',
          dataIndex: 'parent_name',
        },
        {
          title: 'Nama Ibu',
          dataIndex: 'parent_name',
        },
        {
          title: 'Provinsi',
          dataIndex: 'province.name',
        },
        {
          title: 'Kota',
          dataIndex: 'city.name',
        },
        {
          title: 'Kecamatan',
          dataIndex: 'district.name',
        },
        {
          title: 'Kelurahan',
          dataIndex: 'SubDistrict.name',
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      loading: true
    }
  },
  created () {
    this.getDataImunisasi()
  },
  methods: {
    handleTableChange(pagination, filter) {
      const pager = { ...this.pagination };
      this.pagination = pager;
      
      this.getData({
        page: pagination.current,
        perPage: pagination.pageSize,
        filter : this.filter
      });
    },
    getDataImunisasi () {
      this.loading = true
      this.$axios.get('https://sehatindonesiaku-api.kemkes.go.id/toddlers/page-prev-next?page_id=0&page_limit=10071&page_event=next&status=1', {
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJEaW5rZXMgUGVzYXdhcmFuIiwicm9sZV9pZCI6MiwiaGVhbHRoV29ya2VyIjpudWxsLCJoZWFkRGVwYXJ0bWVudCI6eyJpZCI6MTgwMCwidXNlcl9pZCI6MTIwODQsImxvY2F0aW9uX2lkIjoyNTcxOCwibG9jYXRpb24iOnsiaWQiOjI1NzE4LCJjb2RlIjoiMTgwOSIsIm5hbWUiOiJQZXNhd2FyYW4iLCJsZXZlbCI6MiwicGFyZW50X2lkIjoyMzY1NSwicGFyZW50Ijp7ImlkIjoyMzY1NSwiY29kZSI6IjE4IiwibmFtZSI6IkxhbXB1bmciLCJsZXZlbCI6MSwicGFyZW50X2lkIjpudWxsLCJwYXJlbnQiOm51bGx9fX19LCJyb2xlcyI6WyJIRUFEX09GX0hFQUxUSF9ERVBBUlRNRU5UIl0sInBlcm1pc3Npb25zIjpbXSwiaWF0IjoxNjY4NDk5OTk2LCJleHAiOjE2Njg1ODYzOTZ9.bpjEiIt273qHYJxpJq0GQvMneybEIZucBCkmrHq9mAA'
        }
      }).finally(() => { this.loading = false})
        .then(res => {
          this.data = res.data.data
        }).catch(() => this.$commonErrorNotif())
    },
    goToDetail (record) {
      this.$router.push({name: 'DetailImunisasiNasional', params: {id: record.id}})
    }
  }
})

</script>
<style>
</style>