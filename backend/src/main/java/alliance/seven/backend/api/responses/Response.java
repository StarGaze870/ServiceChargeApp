package alliance.seven.backend.api.responses;

public class Response<T> {

    private int status;
    private T data;

    public Response(int status, T data) {
        this.status = status;
        this.data = data;
    }

    public int getStatus() {
        return status;
    }

    public T getData() {
        return data;
    }
}

