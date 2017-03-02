$(document).ready( () => {
  let baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1'

fetchUsers = () => {
  let $users = $('#users');
   $users.empty();
   $.ajax({
     url: `${baseUrl}/users`,
     type: 'GET',
     dataType: 'JSON'
   }).done( data => {
     console.log(data)
     data.forEach( user => {
       $('#users').append(`
                           <li>
                             ${user.first_name}
                             <button data-id=${user.id} class ='details-btn btn'>Toggle Details</button>
                             <button data-id=${user.id} class ='delete-btn btn'>Delete User</button>
                             <button data-id=${user.id} class ='edit-btn btn'>Edit User</button>
                           </li>
                           `);
     });
   }).fail( data => {
    // flash message, or alert
   });
  }

  fetchUsers();

  // $(document).on('click', 'edit.btn', (event) => {
  //   let userId = $(event.target).data('id');
  //   let $userForm = $('#user-form');
  //     $userForm.submit( (event) => {

  //     $.ajax({
  //       url: `${baseUrl}/users/${userId}`,
  //       type: 'GET',
  //       datatType: 'JSON',
  //       data: $userForm.serializeArray()
  //     }).done( data => {
  //       // user form needs to have course info populated
  //       $userForm;
  //       $('user-first-name').focus();
  //       fetchUsers();
  //     }).fail( data => {
  //       console.log(data)
  //     });
  //   });
  // });

  $(document).on('click', '.delete-btn', (event) => {
    let userId = $(event.target).data('id');

    $.ajax({
      url: `${baseUrl}/users/${userId}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      fetchUsers();
    }).fail( data => {
      // flash message, or alert
    });
  });

  $(document).on('click', '.details-btn', (event) => {
    let userId = $(event.target).data('id');
    $.ajax({
      url: `${baseUrl}/users/${userId}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( user => {
      let $userInfo = $('#user-info');
      $userInfo.html(`
                      <p>${user.first_name}</p>
                      <p>${user.last_name}</p>
                      <p>${user.phone_number}</p>
                      `)
      $userInfo.show();
    }).fail( data => {
      // flash message, or alert
    });
  });

  let $userForm = $('#user-form');

  $userForm.submit( (event) => {
    event.preventDefault();
    $.ajax({
      url: `${baseUrl}/users`,
      type: 'POST',
      dataType: 'JSON',
      data: $userForm.serializeArray()
    }).done( data => {
      $userForm[0].reset();
      $('#user-first-name').focus();
      fetchUsers();
    }).fail( data => {
      // flash message, or alert
    });
  });
});