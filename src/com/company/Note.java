package com.company;

public class Note {

    private int id;
    private String text;
    private Boolean isChecked;

    public Note() {

    }

    public Note(String text, Boolean isChecked) {
        this.text = text;
        this.isChecked = isChecked;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getChecked() {
        return isChecked;
    }

    public void setChecked(Boolean checked) {
        isChecked = checked;
    }

    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", isChecked=" + isChecked +
                '}';
    }
}
