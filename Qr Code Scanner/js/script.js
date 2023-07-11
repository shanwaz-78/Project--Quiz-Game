const wrapper = document.getElementById("wrapper");
const fileInput = document.getElementById("upload_file");


wrapper.addEventListener("click", () => fileInput.click());

function fetch_request(formData) {
  try {
  const response = fetch('https://goqr.me/api/doc/read-qr-code/',{
      method : 'POST', body : formData
    }).then(res => res.json()).then(result => {
      console.log(result);
    });
  } catch (error) {
    console.log('Error is ', error);
  }
}

function get_selected_files() {
  fileInput.addEventListener('change',(file)=> {
    const files = file.target.files;
    const formData = new FormData();
    formData.append('file',files);
    fetch_request(formData);
  })
}
get_selected_files();