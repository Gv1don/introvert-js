// Заменить значения
const apiKey = '<API-ключ>';
const subdomain = '<субдомен>';
const userLogin = '<пользователь>';

// Функция для создания задачи для контакта без сделок
function createTaskForContactWithoutDeals(contactId) {
  // Объект с параметрами задачи
  const taskData = {
    add: [
      {
        element_type: 1,
        element_id: contactId,
        task_type: 1,
        text: 'Контакт без сделок',
      },
    ],
  };

  // Запрос на создание задачи
  fetch(`https://${subdomain}.amocrm.ru/api/v4/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(taskData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Задача создана:', data);
    })
    .catch((error) => {
      console.error('Ошибка при создании задачи:', error);
    });
}

// Функция для получения контактов без сделок и создания для них задач
function createTasksForContactsWithoutDeals() {
  // Запрос на получение контактов без сделок
  fetch(`https://${subdomain}.amocrm.ru/api/v4/contacts?filter[pipelines][is] = null`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const contacts = data._embedded.contacts;

      // Создание задачи для каждого контакта без сделок
      contacts.forEach((contact) => {
        createTaskForContactWithoutDeals(contact.id);
      });
    })
    .catch((error) => {
      console.error('Ошибка при получении контактов:', error);
    });
}

// Вызов функции для создания задач для контактов без сделок
createTasksForContactsWithoutDeals();
