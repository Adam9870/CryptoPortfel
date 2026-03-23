package model;

public class Trade {

    private String type;
    private double price;
    private int index;

    public Trade(String type, double price, int index) {
        this.type = type;
        this.price = price;
        this.index = index;
    }

    public String getType() {
        return type;
    }

    public double getPrice() {
        return price;
    }

    public int getIndex() {
        return index;
    }
}