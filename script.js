class Product {
  constructor() {
    this.id = 1
    this.arrayProducts = []
    this.editId = null
  }

  save() {
    let product = this.get()

    if (this.validation(product) === true) {
      if (this.editId === null) {
        this.add(product)
      } else {
        this.update(this.editId, product)
      }
    }

    this.listTable()
    this.cancel()
  }

  listTable() {
    let tbody = document.getElementById('tbody')
    tbody.innerText = ''

    for (let i = 0; i < this.arrayProducts.length; i++) {
      let tr = tbody.insertRow()

      let td_id = tr.insertCell()
      let td_name = tr.insertCell()
      let td_value = tr.insertCell()
      let td_action = tr.insertCell()

      td_id.innerText = this.arrayProducts[i].id
      td_name.innerText = this.arrayProducts[i].productName
      td_value.innerText = this.arrayProducts[i].productValue

      td_id.classList.add('center')

      let iconEdit = document.createElement('i')
      iconEdit.className = 'fa-solid fa-pen-to-square'
      iconEdit.setAttribute(
        'onclick',
        'product.edit(' + JSON.stringify(this.arrayProducts[i]) + ')'
      )

      let iconTrash = document.createElement('i')
      iconTrash.className = 'fa-solid fa-trash'
      iconTrash.setAttribute(
        'onclick',
        'product.delete(' + this.arrayProducts[i].id + ')'
      )

      td_action.appendChild(iconEdit)
      td_action.appendChild(iconTrash)
    }
  }

  add(product) {
    this.arrayProducts.push(product)
    this.id++
  }

  update(id, product) {
    for (let i = 0; i < this.arrayProducts.length; i++) {
      if (this.arrayProducts[i].id == id) {
        this.arrayProducts[i].productName = product.productName
        this.arrayProducts[i].productValue = product.productValue
      }
    }
  }

  edit(dados) {
    this.editId = dados.id

    document.getElementById('product').value = dados.productName
    document.getElementById('value').value = dados.productValue

    document.getElementById('btnSave').innerText = 'Atualizar'
  }

  get() {
    let product = {}

    product.id = this.id
    product.productName = document.getElementById('product').value
    product.productValue = document.getElementById('value').value

    return product
  }

  validation(product) {
    let message = ''

    if (product.productName === '') {
      message += 'Informe o nome do produto\n'
    }
    if (product.productValue === '') {
      message += 'Informe o preço do produto\n'
    }
    if (message != '') {
      alert(message)
      return false
    }

    return true
  }

  cancel() {
    document.getElementById('product').value = ''
    document.getElementById('value').value = ''

    document.getElementById('btnSave').innerText = 'Salvar'
    this.editId = null
  }

  delete(id) {
    if (confirm(`Deseja realmente deletar o produto do ${id}?`)) {
      let tbody = document.getElementById('tbody')

      for (let i = 0; i < this.arrayProducts.length; i++) {
        if (this.arrayProducts[i].id == id) {
          this.arrayProducts.splice(i, 1)
          tbody.deleteRow(i)
        }
      }
    }
  }
}

var product = new Product()
