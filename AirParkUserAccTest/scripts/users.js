/// <reference path="jquery-2.0.0.min.js" />
/// <reference path="knockout-3.4.0.js" />

var ViewModel = function () {

    var self = this;
    self.Id = ko.observable();
    self.ForeName = ko.observable();
    self.SurName = ko.observable();
    self.Email = ko.observable();
    self.CreatedDate = ko.observable();

    self.userList = ko.observableArray([]);

    var UserUri = '/api/User/';

    self.add = function (Id, ForeName, SurName, Email, CreatedDate) {
        self.userList.push(new User(self, Id, ForeName, SurName, Email, CreatedDate));
    };

    function ajaxFunction(uri, method, data) {
        return $.ajax({

            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null  
  
        }).fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error  ' + errorThrown);
            });
    }

    // Clear Fields  
    self.clearFields = function clearFields() {
        self.ForeName('');
        self.SurName('');
        self.Email('');
    };

    //Add new User  
    self.addNewUser = function addNewUser(newUser) {

        var UserObject = {
            Id: self.Id(),
            ForeName: self.ForeName(),
            SurName: self.SurName(),
            Email: self.Email(),
            CreatedDate: self.CreatedDate()
        };
        ajaxFunction(UserUri, 'POST', UserObject).done(function () {

            self.clearFields();
            alert('User Added Successfully !');
            getUserList();
        });
    };

    //Get User List  
    function getUserList() {
        $("div.loadingZone").show();
        ajaxFunction(UserUri, 'GET').done(function (data) {
            $("div.loadingZone").hide();
            self.userList(data);
        });
    }

    //Get Detail User  
    self.detailUser = function (selectedUser) {

        self.Id(selectedUser.Id);
        self.ForeName(selectedUser.ForeName);
        self.SurName(selectedUser.SurName);
        self.Email(selectedUser.Email);
        self.CreatedDate(selectedUser.CreatedDate);

        $('#Save').hide();
        $('#Clear').hide();

        $('#Update').show();
        $('#Cancel').show();

    };

    self.cancel = function () {

        self.clearFields();

        $('#Save').show();
        $('#Clear').show();

        $('#Update').hide();
        $('#Cancel').hide();
    };

    //Update User  
    self.updateUser = function () {

        var UserObject = {
            Id: self.Id(),
            ForeName: self.ForeName(),
            SurName: self.SurName(),
            Email: self.Email(),
            CreatedDate: self.CreatedDate()
        };

        ajaxFunction(UserUri + '?id=' + self.Id(), 'PUT', UserObject).done(function () {
            alert('User Updated Successfully !');
            getUserList();
            self.cancel();
        });
    };

    //Delete User  
    self.deleteUser = function (user) {

        ajaxFunction(UserUri + '?id=' + user.Id, 'DELETE').done(function () {

            alert('User Deleted Successfully');
            getUserList();
        });
    };
    getUserList();
};

ko.applyBindings(new ViewModel());  
