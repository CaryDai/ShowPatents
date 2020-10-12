<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-title {
  float: left;
  position: relative;
  top: 1px;
  left: 20px;
  font-size: large;
  font-style: normal;
  color: #f5f7f9;
}
.layout-nav {
  width: 500px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>

<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-title">知识导航平台</div>
          <div class="layout-nav">
            <MenuItem router-link to="/graph" name="1">
              <Icon type="ios-navigate"></Icon>知识地图
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-paper"></Icon>知识库
            </MenuItem>
            <MenuItem router-link to="/custom" name="3">
              <Icon type="ios-keypad"></Icon>专题库构建
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-analytics"></Icon>Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>

      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 400px;">
            <router-view />
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2017-2020 &copy; 佐创智推</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>
