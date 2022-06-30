const elBody = document.querySelector(".site-main__container")
const elTable = document.querySelector('.site-main__box-table-tbody')
const elFormAdd = document.querySelector('.site-main__form')
const elTemplate = document.querySelector('.template').content
const elContainer = document.querySelector('.site-main__container')

const elFirstName = document.querySelector('#firstname')
const elLastName = document.querySelector('#lastname')
const elAge = document.querySelector('#age')
const elDeleteBtn = document.querySelector('.delete')
const elCloseBtn = document.querySelector('.close-btn')

const elModalEditBtn = document.querySelector('#modal-edit-btn')

// function

async function getStudent() {
    elTable.innerHTML = ''
    const promise = await fetch('https://student-express.herokuapp.com/site/student')
    const data =  await promise.json()
    console.log(data);
    renderSudents(data.message)
}
getStudent()

async function postStudent(firstName, lastName, age) {
    const promise = await fetch('https://student-express.herokuapp.com/site/student',
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({firstName: firstName, lastName: lastName, age: age})
    }
    )
    getStudent()
}

//DELETE

async function deleteStudent(studentId) {
    const promise = await fetch('https://student-express.herokuapp.com/site/student',
    {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({studentId: studentId})
    }
    )
    getStudent()
}

// Put
async function editStudent(studentId, firstName, lastName, age) {
    const promise = await fetch('https://student-express.herokuapp.com/site/student',
    {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({studentId: studentId, firstName: firstName, lastName: lastName, age: age })
    }
    )
    getStudent()
}


function renderSudents(data) {
       const studentFragment = document.createDocumentFragment()
       data.forEach((item) => {
           const {student_id, first_name, last_name, age} = item
           const newTemplate = elTemplate.cloneNode(true)
           newTemplate.querySelector('#id').textContent = student_id
           newTemplate.querySelector('#first-name').textContent = first_name
           newTemplate.querySelector('#last-name').textContent = last_name
           newTemplate.querySelector('#age').textContent = age
           newTemplate.querySelector('#tr').setAttribute('data-id', student_id)
           studentFragment.append(newTemplate)
       });
       elTable.append(studentFragment)
}

function studentDelete() {
    elTable.addEventListener('click', (e) => {
        const id = e.target.closest('#tr').dataset.id
        if(e.target.matches('#delete-btn')) {
           const userEdit = {
            studentId: id
        }
         deleteStudent(userEdit.studentId)
        }
    })
}
studentDelete()



const elModalForm = document.querySelector('.edit-student-form')
const elModalName = document.querySelector('#name')
const elModalLastName = document.querySelector('#surname')
const elModalAge = document.querySelector('#age')

function studentEdit() {
    elTable.addEventListener('click', (e) => {
        const elEditId = e.target.closest('#tr').dataset.id
        elModalForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const elModalValue = e.target.elements
            const userEdit = {
               id: elEditId,
               firstName: elModalValue.name.value, 
               lastName: elModalValue.surname.value, 
               age: elModalValue.age.value 
            }
            editStudent(userEdit.id, userEdit.firstName, userEdit.lastName, userEdit.age)
        })
    })
}
studentEdit()

    

// StudentPost
function studentPost() {
    elFormAdd.addEventListener('submit', (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const users = {
                    firstName: elements.firstname.value, 
                    lastName: elements.lastname.value, 
                    age: elements.age.value
                };
                console.log(users)
                postStudent(users.firstName, users.lastName, users.age)
            },
            )
}

studentPost()

const elModal = document.querySelector('.edit-student')

elTable.addEventListener('click', (e) => {
  if(e.target.matches('#edit-btn')) {
    elModal.classList.add('edit-student--open')
  }
})

elCloseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if(e.target.matches('#close-btn')) {
    elModal.classList.remove('edit-student--open')
  }
})
    