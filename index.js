var state = {
    taskList: [],
  };
  
  // DOM Operations
  var taskContents = document.querySelector(".task_contents");
  var taskModal = document.querySelector(".task_modal_body");
  
  const htmlTaskContent = ({ id, title, description, type, url }) => `
      <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
          <div class="card shadow-sm task_card">
              <div class="card-header d-flex justify-content-end task_card_header gap-2">
                  <button type="button" class="btn btn-outline-info mr-2" name=${id} onclick="editTask.apply(this, arguments)">
                      <i class="fas fa-pencil-alt" name=${id}></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger mr-2" name=${id} onclick="deleteTask.apply(this, arguments)">
                      <i class="fas fa-trash-alt" name=${id}></i>
                  </button>
              </div>
              <div class="card-body">
                  ${
                    url
                      ? `<img width="100%" src=${url} alt="card image top" class="card-image-top md-3 rounded-lg" />`
                      : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAACUCAMAAAAkuAyxAAAAMFBMVEXx8/XCy9K/yND09vfV2+DL0tnl6ezGztXq7fDO1dvd4uba3+Tt8PLg5OnR2N3h5umpRzHYAAAEI0lEQVR4nO2b2ZaDIAxAbRAR3P7/b0drbd0JAUXm5D7NSyu3QBIik73+N1nsAVwM+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6XNw/wA4CW11lK9//TnWX66KcWX0mjl/Y2P8QPVdpkQ2Yzesaik8prGh/iBNOVSbnKsi8rH8BF+8GrqHbePYVY3dMMn+EG+N3MLihfRML4f6NKq189iI0nfHtsPXlWG0BuWqaGs0sh+oAqM3GhY5u6Ccf1AYtbmj8J5CuP65bi1+ZtCkTs+IaYf5E5yo2HnVtPE9Kvc9YZd2Lqs0Yh+JL0B4yAYz69y23rzKSzwT4nlB3S9nlJipzCSH6IkO53BGrsJ4/hBe1xPI0Hmek8/AMoxG6S3XiZwUcbLT1bDcbs2rqWvqr1W54cGkwl9/KbKWAi30hfcirIjBKZao/upRswf5aDXBNF75wmrINkPjFg+Cv1BQlV2RGkVJPu1y0lAbvchdIbT64s12xKl+kG5fhTST4XZfFhBqp9aj1LgEhLgz7NIwfMlSvTbqT8KjJ9n3eIuSPVrNg8qMX4ytJ4tdlP9us1zaoSfWu/aIIJnR16q3/bwhlmf218liGBz/GiqX7tZaJXdL2RqWAgeJydyftjET0QRepFedvLjkv3MStAeXqAIH1y+HPXVyPXLOk9bpy98alig939fen2tF2c4a3YPceY7o95vWdD9QP6+XCDaBdfEzpng7lN9zn/fJN8h3l559ZNQlKH9equ2MibHHG4vXp1vmtB++P5LoCO7hZ0scU//7OLYOSG2QfQeP2kfWxg2leg9foEPfceUa8GtH3wJphew42KjO/cDkLlpiqJoTKVVIEV1Q+z8sirUFn6glvdQaiMDKIZuSVhYFopzP70tgEVdSerVk0nvntj5G/KR3/77RpF1rdcVMHWr3boVO/mdXNQQWZF7zOHVded2vPM0//GD13kMKDVxI4bsVqOZpfnRD6wJWJS0+1F31J2bsda/LJiNevYXVq4viT5ceWY/HutvC779cD1zUbperrk9dn6H+t2Cgx++uF9XBza9u2Pnj+k0P/i55N+DNscBV7RzcUyFaO9nXD4nKgc9p28OzOewm7kGcFGg755c1c7FMbaEMvfiF3v35NayemeY4/wRil+BaMXvvAG9m/cLEdInMTcXNg3u23lPA/Gj1gtgUeqyNf0giZ8UtSVR6Libb6TweaVz2pGPHFs+iNzDT5gTv0fo9fgUUOKwLa+iVNU7CK/WiOj2w+hj9HzZv10T9gZPVES9PfU+I7QEQ6/0thcPEqeaRRnQ3X/T67NoO/byYWgP/z+9nrrJtWxN7IL6Qob/d449BoZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGGaHPw6US9EIBwh0AAAAAElFTkSuQmCC" alt="card image top" class="card-image-top md-3 rounded-lg" />`
                  }
                  <h4 class="card-title">${title}</h4>
                  <p class="description trim-3-lines text-muted card-text">${description}</p>
                  <div class="tags text-white d-flex flex-wrap">
                      <span class="badge bg-primary m-1">${type}</span>
                  </div>
              </div>
              <div class="card-footer">
                  <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick='openTask.apply(this,arguments)'>Open Task</button>
              </div>
          </div>
      </div>
  `;
  
  const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
      <div id=${id}>
          ${
            url
              ? `<img width="100%" src=${url} alt="card image cap" class="image-fluid mb-3" />`
              : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAACUCAMAAAAkuAyxAAAAMFBMVEXx8/XCy9K/yND09vfV2+DL0tnl6ezGztXq7fDO1dvd4uba3+Tt8PLg5OnR2N3h5umpRzHYAAAEI0lEQVR4nO2b2ZaDIAxAbRAR3P7/b0drbd0JAUXm5D7NSyu3QBIik73+N1nsAVwM+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6UN+6XNw/wA4CW11lK9//TnWX66KcWX0mjl/Y2P8QPVdpkQ2Yzesaik8prGh/iBNOVSbnKsi8rH8BF+8GrqHbePYVY3dMMn+EG+N3MLihfRML4f6NKq189iI0nfHtsPXlWG0BuWqaGs0sh+oAqM3GhY5u6Ccf1AYtbmj8J5CuP65bi1+ZtCkTs+IaYf5E5yo2HnVtPE9Kvc9YZd2Lqs0Yh+JL0B4yAYz69y23rzKSzwT4nlB3S9nlJipzCSH6IkO53BGrsJ4/hBe1xPI0Hmek8/AMoxG6S3XiZwUcbLT1bDcbs2rqWvqr1W54cGkwl9/KbKWAi30hfcirIjBKZao/upRswf5aDXBNF75wmrINkPjFg+Cv1BQlV2RGkVJPu1y0lAbvchdIbT64s12xKl+kG5fhTST4XZfFhBqp9aj1LgEhLgz7NIwfMlSvTbqT8KjJ9n3eIuSPVrNg8qMX4ytJ4tdlP9us1zaoSfWu/aIIJnR16q3/bwhlmf218liGBz/GiqX7tZaJXdL2RqWAgeJydyftjET0QRepFedvLjkv3MStAeXqAIH1y+HPXVyPXLOk9bpy98alig939fen2tF2c4a3YPceY7o95vWdD9QP6+XCDaBdfEzpng7lN9zn/fJN8h3l559ZNQlKH9equ2MibHHG4vXp1vmtB++P5LoCO7hZ0scU//7OLYOSG2QfQeP2kfWxg2leg9foEPfceUa8GtH3wJphew42KjO/cDkLlpiqJoTKVVIEV1Q+z8sirUFn6glvdQaiMDKIZuSVhYFopzP70tgEVdSerVk0nvntj5G/KR3/77RpF1rdcVMHWr3boVO/mdXNQQWZF7zOHVded2vPM0//GD13kMKDVxI4bsVqOZpfnRD6wJWJS0+1F31J2bsda/LJiNevYXVq4viT5ceWY/HutvC779cD1zUbperrk9dn6H+t2Cgx++uF9XBza9u2Pnj+k0P/i55N+DNscBV7RzcUyFaO9nXD4nKgc9p28OzOewm7kGcFGg755c1c7FMbaEMvfiF3v35NayemeY4/wRil+BaMXvvAG9m/cLEdInMTcXNg3u23lPA/Gj1gtgUeqyNf0giZ8UtSVR6Libb6TweaVz2pGPHFs+iNzDT5gTv0fo9fgUUOKwLa+iVNU7CK/WiOj2w+hj9HzZv10T9gZPVES9PfU+I7QEQ6/0thcPEqeaRRnQ3X/T67NoO/byYWgP/z+9nrrJtWxN7IL6Qob/d449BoZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGGaHPw6US9EIBwh0AAAAAElFTkSuQmCC" alt="card image cap" class="image-fluid mb-3" />`
          }
          <strong class="text-sm text-muted">Created On ${date.toDateString()}</strong>
          <h2 class="my-3">${title}</h2>
          <p class="lead">${description}</p>    
      </div>
    `;
  };
  
  // Storing the dynamic input in local storage
  const updateLocalStorage = () => {
    localStorage.setItem(
      "task",
      JSON.stringify({
        tasks: state.taskList,
      })
    );
  };
  
  const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
  
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
    state.taskList.forEach((cardData) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
  };
  
  const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageURL").value,
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      type: document.getElementById("tags").value,
    };

    if(input.title === "" || input.description === "" || input.type === ""){
        return alert("Please fill all the mandatory fields!")
    }

  
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({ ...input, id })
    );
  
    state.taskList.push({ ...input, id });
    updateLocalStorage();
  };

  const openTask = (e) => {
    if(!e) e = window.event;

    const getTask = state.taskList.find(({id}) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
  }


  //deleteTask
  const deleteTask = (e) => {
    if(!e) e = window.event;
    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    const removeTask = state.taskList.filter(({id}) => id!== targetId);
    state.taskList = removeTask;
    updateLocalStorage();

    if(type == "BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        )
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    )
  }

  const editTask = (e) => {
    if(!e) e = window.event;
    const targetId = e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if(type === "BUTTON"){
        parentNode = e.target.parentNode.parentNode
    }else{
        parentNode = e.target.parentNode.parentNode.parentNode
    }

    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];

    //permissions
    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitButton.setAttribute('onclick',"saveEdit.apply(this, arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML="Save Changes";

  }

  const saveEdit = (e) => {
    if(!e) e = window.event;
    const targetId = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML
    }

    let stateCopy = state.taskList;
    stateCopy = stateCopy.map((task) => task.id === targetId ? {
        id: task.id,
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
        url: task.url
    } : task)
    
    state.taskList = stateCopy;
    updateLocalStorage();

    taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false");

    submitButton.setAttribute('onclick',"openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle","modal");
    submitButton.setAttribute("data-bs-target","#showTask");
    submitButton.innerHTML="Open Task";
  }
  
const searchTask = (e) => {
  if(!e) e = window.event;
  
  while(taskContents.firstChild){
    taskContents.removeChild(taskContents.firstChild);

  }

  const resultData = state.taskList.filter(({title}) => title.includes(e.target.value));
  resultData.map((cardData) => {
    return taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData))
  })
}