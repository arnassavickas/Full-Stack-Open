describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Arnas',
      username: 'savas',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('savas');
      cy.get('#password').type('test');
      cy.get('#login').click();

      cy.contains('logged in as Arnas');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('savas');
      cy.get('#password').type('wrong');
      cy.get('#login').click();

      cy.get('#notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'border', '1px solid rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('savas');
      cy.get('#password').type('test');
      cy.get('#login').click();
    });

    it('A blog can be created', function () {
      cy.contains('create new').click();

      cy.get('#title-input').type('test blog');
      cy.get('#author-input').type('test author');
      cy.get('#url-input').type('www.test.lt');
      cy.get('#create-button').click();

      cy.get('html')
        .should('contain', 'test blog')
        .and('contain', 'test author');
    });

    describe('When user creates a blog', function () {
      beforeEach(function () {
        cy.contains('create new').click();

        cy.get('#title-input').type('test blog');
        cy.get('#author-input').type('test author');
        cy.get('#url-input').type('www.test.lt');
        cy.get('#create-button').click();
      });

      it('A blog can be liked', function () {
        cy.contains('test blog').parent().find('#view-blog').click();
        cy.get('#likes').should('contain', '0');
        cy.contains('test blog').parent().find('#like-button').click();
        cy.get('#likes').should('contain', '1');
      });

      it('A blog can be deleted by the creator', function () {
        cy.contains('test blog').parent().find('#view-blog').click();
        cy.contains('test blog').parent().find('#remove-button').click();
        cy.get('html')
          .should('not.contain', 'test blog')
          .and('not.contain', 'test author')
          .and('not.contain', 'www.test.lt');
      });

      describe('When another user logs-in', function () {
        beforeEach(function () {
          const user = {
            name: 'Someone',
            username: 'other',
            password: 'test',
          };
          cy.request('POST', 'http://localhost:3001/api/users/', user);
          cy.contains('logout').click();

          cy.get('#username').type('other');
          cy.get('#password').type('test');
          cy.get('#login').click();
        });
        it('A blog cannot be deleted by the non-creator', function () {
          cy.contains('test blog').parent().find('#view-blog').click();
          cy.contains('www.test.lt').parent().find('#remove-button').click();
          cy.get('#notification').should('contain', 'you are not the creator');
        });
      });
    });
    describe('When user creates three blogs', function () {
      beforeEach(function () {
        cy.contains('create new').click();
        cy.get('#title-input').type('first');
        cy.get('#author-input').type('pirmas');
        cy.get('#url-input').type('www.test.lt');
        cy.get('#create-button').click();

        cy.contains('create new').click();
        cy.get('#title-input').type('second');
        cy.get('#author-input').type('antras');
        cy.get('#url-input').type('www.test.lt');
        cy.get('#create-button').click();

        cy.contains('create new').click();
        cy.get('#title-input').type('third');
        cy.get('#author-input').type('trecias');
        cy.get('#url-input').type('www.test.lt');
        cy.get('#create-button').click();
      });

      it('a blog with most likes is shown at the top', function () {
        cy.contains('second antras').parent().find('#view-blog').click();
        cy.contains('second antras')
          .parent()
          .find('#like-button')
          .click()
          .click();
        cy.contains('second antras').parent().find('#hide-blog').click();
        cy.contains('third trecias').parent().find('#view-blog').click();
        cy.contains('third trecias').parent().find('#like-button').click();
        cy.contains('third trecias').parent().find('#hide-blog').click();
        cy.wait(500);
        cy.get('#blog-list>div').eq(0).contains('second antrasview');
        cy.get('#blog-list>div').eq(1).contains('third treciasview');
        cy.get('#blog-list>div').eq(2).contains('first pirmasview');
      });
    });
  });
});
