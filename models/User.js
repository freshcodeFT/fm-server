const db = new Map();

class User {
  static currentId = 0;
  constructor ({ id, name, email, gender, isSubscribed }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.isSubscribed = isSubscribed;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    return Promise.resolve(this);
  }

  async save () {
    this.id = User.currentId++;
    db.set(this.id, this);
    return this;
  }

  async update (values) {
    const oldUser = db.get(this.id);

    const newUser = await new User({
      ...oldUser,
      ...values,
    });
    newUser.createdAt = oldUser.createdAt;

    db.set(oldUser.id, newUser);

    return newUser;
  }

  async delete () {
    return db.delete(this.id);
  }

  static deleteById = async id => {
    return db.delete(id);
  };

  static findOne = async id => {
    const user = db.get(id);
    if (user) {
      return user;
    }
    throw new Error('User not found');
  };

  static findAll = async () => {
    return [...db.values()];
  };
}

module.exports = User;
