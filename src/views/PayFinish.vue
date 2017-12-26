<template>
  <div>
    <x-header>支付结果</x-header>
    <div class="icon-wrapper">
      <h3>支付成功</h3>
      <x-icon type="ios-checkmark-outline" size="120"></x-icon>
    </div>
    <card>
      <div slot="content" class="card-padding">
        <cell-form-preview :list="list"></cell-form-preview>
      </div>
    </card>
  </div>
</template>
<script>
    import {XHeader, Card, CellFormPreview} from 'vux'
  export default {
    data() {
      return {
        list: [
          {
          label: '有效期(月)',
          value: 6
        }, {
          label: '订单号',
          value: 'PAYPAL123456789'
        }, {
          label: '商品描述',
          value: 'Annual Subcription at 120 songs/months'
        }, {
          label: '卖家信息',
          value: '北京雷客天地科技有限公司'
        }
        ]
      }
    },
    components: {
      XHeader,
      Card,
      CellFormPreview
    }
  }
</script>
<style>
  .icon-wrapper {
    margin-top: 50px;
    text-align: center;
    color: #9c3;
  }

  .vux-x-icon {
    fill: #9c3;
  }
</style>
