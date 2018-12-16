/* eslint-disable strict, no-undef*/
"use strict";

(function() {
  // inisialisasi endpoint API URL
    var url = {
        base: "https://bookmarks-apis.herokuapp.com/api"
}

    // const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

    const mainSidebar = document.getElementById("mainSidebar");
    const contentWrapper = document.getElementById("contentWrapper");

    var sidebar = document.getElementsByClassName("sidebar")[0];
    var headercontent = document.getElementsByClassName("content-header")[0];
    var isicontent = document.getElementsByClassName("content")[0];

    var ul = document.createElement("ul");
    ul.setAttribute("class","sidebar-menu");
    ul.setAttribute("data-widget","tree");

    var articles = document.createElement("li");
    var categori = document.createElement("li");
    var main = document.createElement("li");
    articles.setAttribute("class","treeview");
    categori.setAttribute("class","treeview");
    main.setAttribute("class","header");

    var link1 = document.createElement("a");
    var link2 = document.createElement("a");
    link1.id = "articlesall";
    link2.id = "categoriall";
    link1.innerText = "Articles";
    link2.innerText = "Categori";
    main.innerText = "MAIN NAVIGATION";

    articles.appendChild(link1);
    categori.appendChild(link2);

    ul.appendChild(main);
    ul.appendChild(articles);
    ul.appendChild(categori);

    sidebar.appendChild(ul);
    mainSidebar.appendChild(sidebar);

    // fungsi load
    function loading(){
        let content = document.getElementsByClassName("content-wrapper")[0];
        var load = document.createElement("div");
        var p = document.createElement('p');
        var preloader = document.createElement('div');
        var spinner = document.createElement('div');
        var circlekiri = document.createElement('div');
        var circlekanan = document.createElement('div');
        var circle1 = document.createElement('div');
        var circle2 = document.createElement('div');

        load.setAttribute('class','loader');
        load.id = "idload";
        preloader.setAttribute('class','preloader');
        spinner.setAttribute('class','spinner-layer pl-red');
        circlekiri.setAttribute('class','circle-clipper left');
        circlekanan.setAttribute('class','circle-clipper right');
        circle1.setAttribute('class','circle');
        circle2.setAttribute('class','circle');

        load.style.textAlign = "center"
        preloader.style.height = "100px"
        preloader.style.width = "100px"
        p.style.marginTop = "20px"
        p.innerText="Loading..."

        circlekiri.appendChild(circle1)
        circlekanan.appendChild(circle2)
        spinner.appendChild(circlekiri)
        spinner.appendChild(circlekanan)
        preloader.appendChild(spinner)
        load.appendChild(preloader)
        load.appendChild(p)

        content.appendChild(load)
    }

    // menghapus kontent yang tidak diinginkan
    function clearContent(){
        var clear = document.getElementsByClassName("content")[0];
        var clear2 = document.getElementsByClassName("content-header")[0];
        while (clear.firstChild) {
            clear.removeChild(clear.firstChild);
        }
        while (clear2.firstChild) {
            clear2.removeChild(clear2.firstChild);
        }
    }

    // check load
    function checkLoad(){
        let check = document.getElementById("idload");
        if (!check){
            loading()
        }
      }
    
    // menghilangkan load
    function removeLoad(){
        let remove = document.getElementById("idload");
        if(remove){
        while (remove.firstChild) {
            remove.removeChild(remove.firstChild);
        }
        remove.remove()
        }
    }

    // fungsi menampilkan list article
    function listArtikel(response){
        clearContent();
        let artikel = response.data;
        setTimeout(function() {
            removeLoad()
            var h1 = document.createElement("h1");
            h1.innerText = "Data Artikel";

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var colAdd = document.createElement("div");
            colAdd.setAttribute("class","col-md-1");

            var linkadd = document.createElement("a");
            linkadd.setAttribute("class","btn btn-block btn-primary");
            linkadd.id = "idaddartikel"
            var iconsadd = document.createElement("i");
            iconsadd.setAttribute("class","fa fa-plus");

            linkadd.innerText = "Add ";

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var table = document.createElement("table");
            table.setAttribute("class","table table-bordered table-striped");
            table.id = "idtable";

            var thead = document.createElement("thead");
            
            var trhead = document.createElement("tr");

            var th1 = document.createElement('th');
            var th2 = document.createElement('th');
            var th3 = document.createElement('th');
            var th4 = document.createElement('th');
            var th5 = document.createElement('th');
            var th6 = document.createElement('th');

            th6.setAttribute('colspan','3');
            th6.style.textAlign="center";

            th1.innerText = "No";
            th2.innerText = "Title";
            th3.innerText = "Description";
            th4.innerText = "Categories";
            th5.innerText = "Created On";
            th6.innerText = "View / Edit / Delete";

            trhead.appendChild(th1);
            trhead.appendChild(th2);
            trhead.appendChild(th3);
            trhead.appendChild(th4);
            trhead.appendChild(th5);
            trhead.appendChild(th6);

            thead.appendChild(trhead);

            var tbody = document.createElement("tbody");

            var tmp = 0;
            for (let index = 0; index < artikel.length; index++) {
                var trbody = document.createElement("tr");
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var td6 = document.createElement('td');
                var td7 = document.createElement('td');
                var td8 = document.createElement('td');
                tmp++;
                td1.innerText = tmp;
                td2.innerText = artikel[index].title;
                td3.innerHTML = artikel[index].description.substr(0,100)+" ...";
                td4.innerText = artikel[index].categories[0].title;
                td5.innerText = artikel[index].created;
                
                var iconView = document.createElement('i');
                iconView.setAttribute('class','fa fa-info');
                td6.appendChild(iconView);
                
                var iconEdit = document.createElement('i');
                iconEdit.setAttribute('class','fa fa-edit');
                td7.appendChild(iconEdit);
                
                
                var iconDelete = document.createElement('i');
                iconDelete.setAttribute('class','fa  fa-trash');
                td8.appendChild(iconDelete);

                td8.addEventListener('click',function(){
                    var pemberitahuan = confirm('Do you really want to delete article "'+artikel[index].title+'" ?');
                    if (pemberitahuan){
                      var API_URL = "https://bookmarks-apis.herokuapp.com/api/articles/"+artikel[index]._id+"/"
                      axios
                        .delete(API_URL)
                        .then()
                        .catch(tampungError);
                      slashpageaddartikel()
                    }
                  })

                td6.style.color = "green";
                td7.style.color = "orange";
                td8.style.color = "red";

                td6.style.textAlign="center";
                td6.style.cursor = "pointer";
                td7.style.textAlign="center";
                td7.style.cursor = "pointer";
                td8.style.textAlign="center";
                td8.style.cursor = "pointer";

                trbody.appendChild(td1);
                trbody.appendChild(td2);
                trbody.appendChild(td3);
                trbody.appendChild(td4);
                trbody.appendChild(td5);
                trbody.appendChild(td6);
                trbody.appendChild(td7);
                trbody.appendChild(td8);

                tbody.appendChild(trbody);
            }

            linkadd.appendChild(iconsadd);
            colAdd.appendChild(linkadd);
            table.appendChild(thead);
            table.appendChild(tbody);
            boxbody.appendChild(table);
            box.appendChild(boxbody);
            col.appendChild(box);
            row.appendChild(colAdd);
            row.appendChild(col);
            isicontent.appendChild(row);
            headercontent.appendChild(h1);
            contentWrapper.appendChild(headercontent);
            contentWrapper.appendChild(isicontent);

            var idaddartikel = document.getElementById('idaddartikel')
            idaddartikel.addEventListener('click',function(){
                var API_URLs = "https://bookmarks-apis.herokuapp.com/api/article-categories/";
                axios
                    .get(API_URLs)
                    .then(formaddartikel)
                    .catch(tampungError);
            })

        }, 300);
    }

    function listkategori(response){
        clearContent();
        let kategori = response.data;
        setTimeout(function() {
            removeLoad()
            var h1 = document.createElement("h1");
            h1.innerText = "Data Kategori";

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var colAdd = document.createElement("div");
            colAdd.setAttribute("class","col-md-1");

            var linkadd = document.createElement("a");
            linkadd.setAttribute("class","btn btn-block btn-primary");
            linkadd.id = "idaddkategori";
            var iconsadd = document.createElement("i");
            iconsadd.setAttribute("class","fa fa-plus");

            linkadd.innerText = "Add ";

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var table = document.createElement("table");
            table.setAttribute("class","table table-bordered table-striped");
            table.id = "example1";

            var thead = document.createElement("thead");
            
            var trhead = document.createElement("tr");

            var th1 = document.createElement('th');
            var th2 = document.createElement('th');
            var th3 = document.createElement('th');
            var th4 = document.createElement('th');

            th4.setAttribute('colspan','2');
            th4.style.textAlign="center";

            th1.innerText = "No";
            th2.innerText = "Title";
            th3.innerText = "Created On";
            th4.innerText = "Edit / Delete";

            trhead.appendChild(th1);
            trhead.appendChild(th2);
            trhead.appendChild(th3);
            trhead.appendChild(th4);

            thead.appendChild(trhead);

            var tbody = document.createElement("tbody");

            var tmp = 0;
            for (let index = 0; index < kategori.length; index++) {
                var trbody = document.createElement("tr");
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var a1 = document.createElement("a");

                tmp++;
                td1.innerText = tmp;
                td2.innerText = kategori[index].title;
                td3.innerText = kategori[index].created;
                
                var iconEdit = document.createElement('i');
                iconEdit.setAttribute('class','fa fa-edit');
                td4.appendChild(iconEdit);

                td4.addEventListener('click',function(){
                    var API_URL = "https://bookmarks-apis.herokuapp.com/api/article-categories/"+kategori[index]._id+"/"
                    panggilAxiosEditCategory(API_URL)
                })
                
                var iconDelete = document.createElement('i');
                iconDelete.setAttribute('class','fa  fa-trash');
                td5.appendChild(iconDelete);

                td5.addEventListener('click',function(){
                    var pemberitahuan = confirm('apa anda ingin menghapus kategori "'+kategori[index].title+'" ?,\n jika anda menghapusnya maka di artikel akan keapus');
                    if (pemberitahuan){
                      var API_URL = "https://bookmarks-apis.herokuapp.com/api/article-categories/"+kategori[index]._id+"/"
                      axios
                        .delete(API_URL)
                        .then()
                        .catch(tampungError);
        
                        var API_URLs = "https://bookmarks-apis.herokuapp.com/api/articles?category="+kategori[index]._id
                        axios
                          .get(API_URLs)
                          .then(function(response){
                            var data = response.data
                            for (let index = 0; index<data.length; index++){
                              var API_URL = "https://bookmarks-apis.herokuapp.com/api/articles/"+data[index]._id+"/"
                              axios
                                .delete(API_URL)
                                .then()
                                .catch(tampungError);
                              }
                          })
                          .catch(tampungError);
        
                          slashpagedeletekategori();
                    }
                })

                td4.style.color = "orange";
                td5.style.color = "red";

                td4.style.textAlign="center";
                td4.style.cursor = "pointer";
                td5.style.textAlign="center";
                td5.style.cursor = "pointer";

                trbody.appendChild(td1);
                trbody.appendChild(td2);
                trbody.appendChild(td3);
                trbody.appendChild(td4);
                trbody.appendChild(td5);

                tbody.appendChild(trbody);
            }

            linkadd.appendChild(iconsadd);
            colAdd.appendChild(linkadd);
            table.appendChild(thead);
            table.appendChild(tbody);
            boxbody.appendChild(table);
            box.appendChild(boxbody);
            col.appendChild(box);
            row.appendChild(colAdd);
            row.appendChild(col);
            isicontent.appendChild(row);
            headercontent.appendChild(h1);
            contentWrapper.appendChild(headercontent);
            contentWrapper.appendChild(isicontent);

            var idaddkategori = document.getElementById('idaddkategori')
            idaddkategori.addEventListener('click',function(){
                var API_URLs = "https://bookmarks-apis.herokuapp.com/api/article-categories/";
                axios
                    .get(API_URLs)
                    .then(formaddkategori)
                    .catch(tampungError);
            })

        }, 300);
    }

    function formaddartikel(response){
        clearContent();
        let artikel = response.data;
        setTimeout(function() {
            removeLoad()
            var h1 = document.createElement("h1");
            h1.innerText = "Add Artikel";

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var boxfooter = document.createElement("div");
            boxfooter.setAttribute("class","box-footer");

            var form = document.createElement('form');
            form.setAttribute("role","form")
            form.setAttribute('id','formadd');

            var formgroup = document.createElement("div");
            formgroup.setAttribute("class","form-group");

            var formgroup2 = document.createElement("div");
            formgroup2.setAttribute("class","form-group");

            var formgroup3 = document.createElement("div");
            formgroup3.setAttribute("class","form-group");

            var label = document.createElement("label");
            label.setAttribute("for","exampleInputTitle");
            label.innerText = "Title"
            
            var label2 = document.createElement("label");
            label2.setAttribute("for","exampleInputTitle");
            label2.innerText = "Category"

            var label3 = document.createElement("label");
            label3.setAttribute("for","exampleInputTitle");
            label3.innerText = "Deskripsi"

            var inputtitle = document.createElement("input");
            inputtitle.setAttribute("class","form-control")
            inputtitle.setAttribute("type","text")
            inputtitle.id = "idinputtitle";
            inputtitle.setAttribute("required","required")
            inputtitle.setAttribute("placeholder","Masukkan Kategori")

            var selectkategori = document.createElement("select");
            selectkategori.setAttribute("class","form-control select2");
            selectkategori.style.width = "100%"
            selectkategori.id = "selectkategori"
            selectkategori.required = "required"

            var optionkategori = document.createElement("option");
            optionkategori.setAttribute('value','')
            optionkategori.innerText="Select Kategori.."
            selectkategori.appendChild(optionkategori)

            for( let index = 0 ;index < artikel.length;index++){
                var isioption = document.createElement('option')
                isioption.setAttribute('value',artikel[index]._id)
                isioption.innerText = artikel[index].title
                selectkategori.appendChild(isioption)
            }

            var editorkategori = document.createElement("textarea");
            editorkategori.id = "editor1"
            editorkategori.name = "editor1"
            editorkategori.rows = "10"
            editorkategori.cols = "170"

            var btnsubmit = document.createElement("button");
            btnsubmit.setAttribute("class","btn btn-primary");
            btnsubmit.setAttribute("type","submit");
            btnsubmit.id = "idbtnsubmit";
            btnsubmit.innerText = "Add Artikel"

            formgroup.appendChild(label);
            formgroup.appendChild(inputtitle);
            formgroup2.appendChild(label2);
            formgroup2.appendChild(selectkategori);
            formgroup3.appendChild(label3);
            boxbody.appendChild(formgroup);
            boxbody.appendChild(formgroup2);
            boxbody.appendChild(formgroup3);
            boxbody.appendChild(editorkategori)
            boxfooter.appendChild(btnsubmit);
            form.appendChild(boxbody);
            form.appendChild(boxfooter);
            box.appendChild(form);
            col.appendChild(box);
            row.appendChild(col);
            isicontent.appendChild(row);
            headercontent.appendChild(h1);
            contentWrapper.appendChild(headercontent);
            contentWrapper.appendChild(isicontent);

            var formadd = document.getElementById("formadd");
            formadd.addEventListener("submit", function(event) {
                var tmp=0;
                for( let index = 0 ;index < artikel.length; index++){
                    var inputtitle = document.getElementById('idinputtitle').value
                    if ( artikel[index].title.toLowerCase() == inputtitle.toLowerCase() ){
                        tmp++;
                    }
                }
                if(tmp == 0){
                var answer = confirm("apa anda ingin menambahkannya ?");
                if (answer) {
                        var inputtitle = document.getElementById('idinputtitle').value
                        var kategori = document.getElementById('selectkategori').value
                        var deskripsi = CKEDITOR.instances["editor1"].getData();
                        var artikeliurl = "https://bookmarks-apis.herokuapp.com/api/articles/"
                        axios
                        .post(artikeliurl, {
                        title: inputtitle,
                        description: deskripsi,
                        categories: [kategori]
                        })
                        .then()
                        .catch(tampungError);
                        
                        slashpageaddartikel();
                        event.preventDefault();
                    }else{
                        event.preventDefault();
                    }
                }else{
                alert("Sorry, this Artikel title already exists")
                event.preventDefault();
                }
            });

        }, 300);
    }

    function formaddkategori(response){
        clearContent();
        let kategori = response.data;
        setTimeout(function() {
            removeLoad()
            var h1 = document.createElement("h1");
            h1.innerText = "Add Kategori";

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var boxfooter = document.createElement("div");
            boxfooter.setAttribute("class","box-footer");

            var form = document.createElement('form');
            form.setAttribute("role","form")
            form.setAttribute('id','formadd');

            var formgroup = document.createElement("div");
            formgroup.setAttribute("class","form-group");

            var label = document.createElement("label");
            label.setAttribute("for","exampleInputTitle");
            label.innerText = "Title"

            var inputtitle = document.createElement("input");
            inputtitle.setAttribute("class","form-control")
            inputtitle.setAttribute("type","text")
            inputtitle.id = "idinputtitle";
            inputtitle.setAttribute("required","required")
            inputtitle.setAttribute("placeholder","Masukkan Kategori")

            var btnsubmit = document.createElement("button");
            btnsubmit.setAttribute("class","btn btn-primary");
            btnsubmit.setAttribute("type","submit");
            btnsubmit.id = "idbtnsubmit";
            btnsubmit.innerText = "Add Kategori"

            formgroup.appendChild(label);
            formgroup.appendChild(inputtitle);
            boxbody.appendChild(formgroup);
            boxfooter.appendChild(btnsubmit);
            form.appendChild(boxbody);
            form.appendChild(boxfooter);
            box.appendChild(form);
            col.appendChild(box);
            row.appendChild(col);
            isicontent.appendChild(row);
            headercontent.appendChild(h1);
            contentWrapper.appendChild(headercontent);
            contentWrapper.appendChild(isicontent);

            var formadd = document.getElementById("formadd");
            formadd.addEventListener("submit", function(event) {
                var tmp=0;
                for( let index = 0 ;index < kategori.length; index++){
                    var inputtitle = document.getElementById('idinputtitle').value
                    if ( kategori[index].title.toLowerCase() == inputtitle.toLowerCase() ){
                        tmp++;
                    }
                }
                if(tmp == 0){
                var answer = confirm("apa anda ingin menambahkannya ?");
                if (answer) {
                        var inputtitle = document.getElementById('idinputtitle').value
                        var kategoriurl = "https://bookmarks-apis.herokuapp.com/api/article-categories/"
                        axios
                        .post(kategoriurl, {
                        title: inputtitle
                        })
                        .then()
                        .catch(tampungError);
                        
                        slashpageaddkategori();
                        event.preventDefault();
                    }else{
                        event.preventDefault();
                    }
                }else{
                alert("Sorry, this category title already exists")
                event.preventDefault();
                }
            });

        }, 300);
    }

    function slashpageaddartikel(){
        clearContent();
        setTimeout(function() {
            removeLoad()

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var boxfooter = document.createElement("div");
            boxfooter.setAttribute("class","box-footer");

            var h3 = document.createElement("h3");
            h3.innerText = "Anda Berhasil Menambahkan, Silakan Kembali Ke List Artikel"

            var btnsubmit = document.createElement("button");
            btnsubmit.setAttribute("class","btn btn-primary");
            btnsubmit.setAttribute("type","submit");
            btnsubmit.id = "idbtnsubmit";
            btnsubmit.innerText = "Back To List Artikel"

            boxbody.appendChild(h3);
            boxfooter.appendChild(btnsubmit);
            box.appendChild(boxbody);
            box.appendChild(boxfooter);
            col.appendChild(box);
            row.appendChild(col);
            isicontent.appendChild(row);
            contentWrapper.appendChild(isicontent);

            var idbtnsubmit = document.getElementById('idbtnsubmit')
            idbtnsubmit.addEventListener('click',function(){
                var API_URL = "https://bookmarks-apis.herokuapp.com/api/articles/"
                viewArtikel(API_URL)
            })

        }, 300);
    }

    function slashpageaddkategori(){
        clearContent();
        setTimeout(function() {
            removeLoad()

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var boxfooter = document.createElement("div");
            boxfooter.setAttribute("class","box-footer");

            var h3 = document.createElement("h3");
            h3.innerText = "Anda Berhasil Menambahkan, Silakan Kembali Ke List Kategori"

            var btnsubmit = document.createElement("button");
            btnsubmit.setAttribute("class","btn btn-primary");
            btnsubmit.setAttribute("type","submit");
            btnsubmit.id = "idbtnsubmit";
            btnsubmit.innerText = "Back To List Kategori"

            boxbody.appendChild(h3);
            boxfooter.appendChild(btnsubmit);
            box.appendChild(boxbody);
            box.appendChild(boxfooter);
            col.appendChild(box);
            row.appendChild(col);
            isicontent.appendChild(row);
            contentWrapper.appendChild(isicontent);

            var idbtnsubmit = document.getElementById('idbtnsubmit')
            idbtnsubmit.addEventListener('click',function(){
                var API_URL = "https://bookmarks-apis.herokuapp.com/api/article-categories/"
                viewKategori(API_URL)
            })

        }, 300);
    }

    function slashpagedeleteartikel(){
        clearContent();
        setTimeout(function() {
            removeLoad()

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var boxfooter = document.createElement("div");
            boxfooter.setAttribute("class","box-footer");

            var h3 = document.createElement("h3");
            h3.innerText = "Anda Berhasil Menghapus, Silakan Kembali Ke List Artikel"

            var btnsubmit = document.createElement("button");
            btnsubmit.setAttribute("class","btn btn-primary");
            btnsubmit.setAttribute("type","submit");
            btnsubmit.id = "idbtnsubmit";
            btnsubmit.innerText = "Back To List Artikel"

            boxbody.appendChild(h3);
            boxfooter.appendChild(btnsubmit);
            box.appendChild(boxbody);
            box.appendChild(boxfooter);
            col.appendChild(box);
            row.appendChild(col);
            isicontent.appendChild(row);
            contentWrapper.appendChild(isicontent);

            var idbtnsubmit = document.getElementById('idbtnsubmit')
            idbtnsubmit.addEventListener('click',function(){
                var API_URL = "https://bookmarks-apis.herokuapp.com/api/articles/"
                viewArtikel(API_URL)
            })

        }, 300);
    }

    function slashpagedeletekategori(){
        clearContent();
        setTimeout(function() {
            removeLoad()

            var row = document.createElement("row");
            row.setAttribute("class","row");

            var col = document.createElement("div");
            col.setAttribute("class","col-md-12 col-sm-12 col-xs-12");

            var box = document.createElement("div");
            box.setAttribute("class","box");

            var boxbody = document.createElement("div");
            boxbody.setAttribute("class","box-body");

            var boxfooter = document.createElement("div");
            boxfooter.setAttribute("class","box-footer");

            var h3 = document.createElement("h3");
            h3.innerText = "Anda Berhasil Menghapus, Silakan Kembali Ke List Kategori"

            var btnsubmit = document.createElement("button");
            btnsubmit.setAttribute("class","btn btn-primary");
            btnsubmit.setAttribute("type","submit");
            btnsubmit.id = "idbtnsubmit";
            btnsubmit.innerText = "Back To List Kategori"

            boxbody.appendChild(h3);
            boxfooter.appendChild(btnsubmit);
            box.appendChild(boxbody);
            box.appendChild(boxfooter);
            col.appendChild(box);
            row.appendChild(col);
            isicontent.appendChild(row);
            contentWrapper.appendChild(isicontent);

            var idbtnsubmit = document.getElementById('idbtnsubmit')
            idbtnsubmit.addEventListener('click',function(){
                var API_URL = "https://bookmarks-apis.herokuapp.com/api/article-categories/"
                viewKategori(API_URL)
            })

        }, 300);
    }

    function tampungError(error) {
        // hide loading
        console.log(error)
    }

    loading();
    axios
    .get(url.base+"/article-categories/")
    .then(listkategori)
    .catch(tampungError);

    function viewArtikel(API_URL) {
        axios
          .get(API_URL)
          .then(listArtikel)
          .catch(tampungError);
    }
    
    function viewKategori(API_URL) {
        axios
          .get(API_URL)
          .then(listkategori)
          .catch(tampungError);
    }

    var categoriall = document.getElementById("categoriall");
    categoriall.addEventListener("click", function() {
        var articlesall = document.getElementById('articlesall')
        articlesall.removeAttribute('class')
        categoriall.setAttribute('class','active')
        var API_URL = "https://bookmarks-apis.herokuapp.com/api/article-categories/"
        viewKategori(API_URL);
    });

    var articlesall = document.getElementById("articlesall");
    articlesall.addEventListener("click", function() {
        
        var categoriall = document.getElementById('categoriall')
        categoriall.removeAttribute('class')
        articlesall.setAttribute('class','active')
        var API_URL = "https://bookmarks-apis.herokuapp.com/api/articles/"
        viewArtikel(API_URL);
    }, false);

})();
