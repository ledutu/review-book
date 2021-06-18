#!bin/bash

# Author: Le Duc Tung
# Username: ledutu
# Script will be showed below:

API_URL=http://localhost:3000/api/db

TYPE=$1
TIMES=$2
LOCALE=$3
HASH=ledutu

function createUser () {
    echo "Creating User database......"
    RESPONSE=`wget -qO- ${API_URL}/user?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create user database successful"
    else
        echo "Create user database fail, please check and try again"
        exit 1
    fi
}

function createBookCategory() {
    echo "Creating Book Category database......"
    RESPONSE=`wget -qO- ${API_URL}/book-category?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create book category database successful"
    else
        echo "Create book category database fail, please check and try again"
        exit 1
    fi
}

function createBlogTag() {
    echo "Creating Blog Tag"
    RESPONSE=`wget -qO- ${API_URL}/blog-tag?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create blog tag database successful"
    else
        echo "Create blog tag database fail, please check and try again"
        exit 1
    fi
}

function createBook() {
    echo "Creating Book database......"
    RESPONSE=`wget -qO- ${API_URL}/book?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create book database successful"
    else
        echo "Create book database fail, please check and try again"
        exit 1
    fi
}

function createBlog() {
    echo "Creating Blog database......"
    RESPONSE=`wget -qO- ${API_URL}/blog?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create Blog database successful"
    else
        echo "Create Blog database fail, please check and try again"
        exit 1
    fi
}

function createBookComment () {
    echo "Creating Book Comment database......"
    RESPONSE=`wget -qO- ${API_URL}/book-comment?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create Book Comment database successful"
    else
        echo "Create Book Comment database fail, please check and try again"
        exit 1
    fi
}

function createBlogComment() {
    echo "Creating Blog Comment database......"
    RESPONSE=`wget -qO- ${API_URL}/blog-comment?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create Blog Comment database successful"
    else
        echo "Create Blog Comment database fail, please check and try again"
        exit 1
    fi
}

function createBookVote() {
    echo "Creating Book vote database......"
    RESPONSE=`wget -qO- ${API_URL}/create-book-vote?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create Book vote database successful"
    else
        echo "Create Book vote database fail, please check and try again"
        exit 1
    fi
}

function createBlogVote() {
    echo "Creating Blog vote database......"
    RESPONSE=`wget -qO- ${API_URL}/create-blog-vote?times=${TIMES}\&locale=${LOCALE}`
    if [ $RESPONSE ]
    then
        echo "Create Blog vote database successful"
    else
        echo "Create Blog vote database fail, please check and try again"
        exit 1
    fi
}

function calculateVote() {
    echo "Calculating book and blog database......"
    RESPONSE=`wget -qO- ${API_URL}/calculate-vote`
    if [ $RESPONSE ]
    then
        echo "Calculating book and blog database successful"
    else
        echo "Calculating book and blog database fail, please check and try again"
        exit 1
    fi
}

function createAll() {
    createUser
    createBookCategory
    createBlogTag
    createBook
    createBlog
    createBookComment
    createBlogComment
    createBookVote
    createBlogVote
    calculateVote
}

function main() {
    case $TYPE in
        "user")
            createUser
        ;;
        "book-category")
            createBookCategory
        ;;
        "blog-tag")
            createBlogTag
        ;;
        "book")
            createBook
        ;;
        "blog")
            createBlog
        ;;
        "book-comment")
            createBookComment
        ;;
        "blog-comment")
            createBlogComment
        ;;
        "book-vote")
            createBookVote
        ;;
        "blog-vote")
            createBlogVote
        ;;
        "calculate-vote")
            calculateVote
        ;;
        "all")
            createAll
        ;;
        *)
            echo 'Your key is wrong, please try again'
        ;;
    esac
}

main