const loadingDecorator = target => {
  target.prototype.toggleLoading = function (loading = false, loadingKey = 'loading') {
    this.setState({ [loadingKey]: loading })
  }
}

export {
  loadingDecorator
}