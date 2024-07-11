const getList = async () => {
  let url = "http://localhost:5000/receitas";

  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.receitas.forEach((item) =>
        insertList(item.id, item.titulo, item.categoria, item.status)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const newImagem = () => {
  let url = "https://loremflickr.com/800/600/food";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const imageElement = document.getElementById("imagem-dinamica");
      imageElement.src = blobUrl;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

window.onload = () => {
  newImagem();
  carregaIngredientesAPI();
};

getList();

const postItem = async (
  inputTitulo,
  inputStatus,
  inputCategoria,
  inputPreparo
) => {
  const formData = new FormData();
  formData.append("titulo", inputTitulo);
  formData.append("status", inputStatus);
  formData.append("preparo", inputPreparo);
  formData.append("categoria", inputCategoria);

  let url = "http://localhost:5000/receita";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      newIngrediente2(data.id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const putItem = async (
  inputTitulo,
  inputStatus,
  inputCategoria,
  inputPreparo
) => {
  const formData = new FormData();
  formData.append("titulo", inputTitulo);
  formData.append("status", inputStatus);
  formData.append("preparo", inputPreparo);
  formData.append("categoria", inputCategoria);

  let url = "http://localhost:5000/receita";
  fetch(url, {
    method: "put",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

const postIngrediente = async (
  inputDescricao,
  inputQuantidade,
  inputUnidadeMedida,
  inputReceitaID
) => {
  const formData = new FormData();
  formData.append("descricao", inputDescricao);
  formData.append("quantidade", inputQuantidade);
  formData.append("unidade_medida", inputUnidadeMedida);
  formData.append("receita_id", inputReceitaID);

  let url = "http://localhost:5000/ingrediente";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
};

const inserDetailtButton = (parent) => {
  let span = document.createElement("spanDetail");
  let txt = document.createTextNode("...");
  span.className = "detail";
  span.appendChild(txt);
  parent.appendChild(span);
};

const inserAddButton = (parent) => {
  let span = document.createElement("spanDetail");
  let txt = document.createTextNode("+");
  span.className = "addIng";
  span.appendChild(txt);
  parent.appendChild(span);
};

const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[1].innerHTML;
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(nomeItem);
        alert("Removido!");
      }
    };
  }
};

const removeIngredient = () => {
  let close = document.getElementsByClassName("close");
  let receita_id = document.getElementById("idReceita").value;

  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[0].innerHTML;
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteIngrediente(nomeItem, receita_id);
        alert("Ingrediente Removido!");
      }
    };
  }
};

const detailElement = () => {
  let open = document.getElementsByClassName("detail");

  let i;
  for (i = 0; i < open.length; i++) {
    open[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[1].innerHTML;
      detailItem(nomeItem);
    };
  }
};

const adicionarIngredientesAPI = () => {
  let open = document.getElementsByClassName("addIng");

  let i;
  for (i = 0; i < open.length; i++) {
    open[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[1].innerHTML;
    };
  }
};

const deleteItem = (item) => {
  console.log(item);
  let url = "http://localhost:5000/receita?titulo=" + item;
  fetch(url, {
    method: "delete",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

const deleteIngrediente = (item, receita_id) => {
  console.log(item);
  let url =
    "http://localhost:5000/ingrediente?descricao=" +
    item +
    "&receita=" +
    receita_id;
  fetch(url, {
    method: "delete",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

const detailItem = (item) => {
  console.log(item);
  let url = "http://localhost:5000/receita?titulo=" + item;
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      insertDetailItem(
        data.id,
        data.titulo,
        data.categoria,
        data.status,
        data.preparo,
        [data.ingredientes]
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const newItem = () => {
  let inputTitulo = document.getElementById("newTitulo").value;
  let inputPreparo = document.getElementById("newPreparo").value;

  var inputStatus;
  var inputCategoria;

  if (document.getElementById("AP").checked) {
    inputStatus = document.getElementById("AP").value;
  } else if (document.getElementById("RE").checked) {
    inputStatus = document.getElementById("RE").value;
  } else if (document.getElementById("NT").checked) {
    inputStatus = document.getElementById("NT").value;
  }

  if (document.getElementById("DOCE").checked) {
    inputCategoria = document.getElementById("DOCE").value;
  } else if (document.getElementById("SAL").checked) {
    inputCategoria = document.getElementById("SAL").value;
  }

  if (inputTitulo === "") {
    alert("Escreva o titulo da receita!");
  } else {
    postItem(inputTitulo, inputStatus, inputCategoria, inputPreparo);
    alert("Item adicionado!");
  }
};

const updateItem = () => {
  let inputTitulo = document.getElementById("newTitulo").value;
  let inputPreparo = document.getElementById("newPreparo").value;

  var inputStatus;
  var inputCategoria;

  if (document.getElementById("AP").checked) {
    inputStatus = document.getElementById("AP").value;
  } else if (document.getElementById("RE").checked) {
    inputStatus = document.getElementById("RE").value;
  } else if (document.getElementById("NT").checked) {
    inputStatus = document.getElementById("NT").value;
  }

  if (document.getElementById("DOCE").checked) {
    inputCategoria = document.getElementById("DOCE").value;
  } else if (document.getElementById("SAL").checked) {
    inputCategoria = document.getElementById("SAL").value;
  }

  if (inputTitulo === "") {
    alert("Escreva o titulo da receita!");
  } else {
    putItem(inputTitulo, inputStatus, inputCategoria, inputPreparo);
    alert("Item atulizado!");
  }
};

const newIngrediente = () => {
  let select = document.getElementById("list-ingredients2");
  let inputDescricao = select.options[select.selectedIndex].text; // Usar o nome do ingrediente selecionado
  let inputQuantity = document.getElementById("newQtd").value;
  let inputUnidade = document.getElementById("newUnidade").value;

  var item = [inputDescricao, inputQuantity, inputUnidade];
  var table = document.getElementById("myIngredientes");
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButton(row.insertCell(-1));
  removeIngredient();
};

const newIngrediente2 = (receita_id) => {
  var table = document.getElementById("myIngredientes");
  var l = table.rows.length;

  for (var i = 1; i < l; i++) {
    var tr = table.rows[i];
    var descricao = tr.cells.item(0).innerHTML;
    var qunatidade = tr.cells.item(1).innerHTML;
    var unidade_medida = tr.cells.item(2).innerHTML;
    postIngrediente(descricao, qunatidade, unidade_medida, receita_id);
  }
};

const insertList = (inputId, inputTitulo, inputCategoria, inputStatus) => {
  var item = [inputId, inputTitulo, inputCategoria, inputStatus];
  var table = document.getElementById("myTable");
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  inserDetailtButton(row.insertCell(-1));
  detailElement();
  insertButton(row.insertCell(-1));
  removeElement();
};

const insertListIngredientes = (
  inputDescricao,
  inputQuantidade,
  inputUnidadeMedida
) => {
  var item = [inputDescricao, inputQuantidade, inputUnidadeMedida];
  var table = document.getElementById("myIngredientes");
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  removeIngredient();
};

function insertDetailItem(
  inputId,
  inputTitulo,
  inputCategoria,
  inputStatus,
  inputPreparo,
  [ingredientes]
) {
  document.getElementById("newTitulo").value = inputTitulo;
  document.getElementById("idReceita").value = inputId;

  if (inputStatus == "Aprovada") {
    document.getElementById("AP").checked = true;
  } else if (inputStatus == "Reprovada") {
    document.getElementById("RE").checked = true;
  } else {
    document.getElementById("NT").checked = true;
  }

  if (inputCategoria == "Doce") {
    document.getElementById("DOCE").checked = true;
  } else {
    document.getElementById("SAL").checked = true;
  }

  document.getElementById("newPreparo").value = inputPreparo;

  document.getElementById("newItem").style.display = "block";
  document.getElementById("listReceitas").style.display = "none";
  document.getElementById("Salvar").style.display = "none";
  document.getElementById("Atualizar").style.display = "";

  ingredientes.forEach((item) =>
    insertListIngredientes(item.descricao, item.quantidade, item.unidade_medida)
  );
}
const voltar = () => {
  document.getElementById("newTitulo").value = "";
  document.getElementById("newPreparo").value = "";
  document.getElementById("Voltar").style.display = "none";
  document.getElementById("Salvar").style.display = "block";
  window.location.reload(true);
};

const getIngredientes = () => {
  let url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("Ingredientes recebidos:", jsonData); // Verifica se os ingredientes estão sendo recebidos
      insertIngredientesAPI(jsonData.meals);
    })
    .catch((error) => {
      console.error("Erro ao buscar ingredientes:", error);
    });
};

const insertIngredientesAPI = (ingredientes) => {
  const select = document.getElementById("list-ingredients2"); // ID do combobox de ingredientes

  ingredientes.forEach((ingredient) => {
    let option = document.createElement("option");
    option.text = ingredient.strIngredient;
    option.value = ingredient.strIngredient; // Ajustar o valor para ser o nome do ingrediente
    select.appendChild(option);
  });

  select.onchange = function () {
    document.getElementById("newDescricao").value = this.value; // Define o valor do input de descrição para o ingrediente selecionado
  };
};
