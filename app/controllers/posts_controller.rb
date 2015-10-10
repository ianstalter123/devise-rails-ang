class PostsController < ApplicationController

  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @user = current_user
    #binding.pry
    if @user
      @posts = @user.posts
      render json: @posts, status: :ok
    else
      @posts = Post.all
      render json: @posts, status: :ok
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    render json: @post, status: :ok
  end

  # GET /posts/new
  def new
    @user = current_user
    @post = @user.posts.new
  end

  # GET /posts/1/edit
  def edit
   if user_signed_in?
   else
    redirect_to root_path
   end
  end

  # POST /posts
  # POST /posts.json
  def create
    @user = current_user
    @post = @user.posts.new(post_params)

    respond_to do |format|
      if @post.save
         render json: @post, status: :created
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if @post.update(post_params)
      render json: @post, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
     if user_signed_in?

    @post.destroy
    render json: @post, status: ok
    
     else
    redirect_to root_path
   end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title,:content)
    end
end
