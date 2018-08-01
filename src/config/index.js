const pagination = {
  current: 1, // 当前页数
  pageSize: 10, // 一页的条数
  total: 0, // 用户总条数
  pageSizeOptions: Object.freeze(['10', '20', '50', '100']), // 指定每页可以显示多少条
  showSizeChanger: true, // 是否可以改变 pageSize
  showTotal: total => `共${total}条` // 用于显示数据总量和当前数据顺序
}

Object.freeze(pagination)

export default {
  pagination
}