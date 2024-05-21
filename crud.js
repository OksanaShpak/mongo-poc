const { ObjectID } = require('mongodb');

const initCRUD = (contactsCollection) => {

  return {
    create: async (contact) => {
      return contactsCollection.insertOne(contact);
    },
    read: async (id = null) => {
      if (id) {
        if (typeof id === 'string') id = ObjectID(id);

        return contactsCollection.findOne({ _id: id });
      }
      return contactsCollection.find().toArray();
    },
    update: async (id, contact) => {
      if (typeof id === 'string') id = ObjectID(id);

      return contactsCollection.updateOne({ _id: id }, { $set: contact });
    },
    dremove: async (id) => {
      if (typeof id === 'string') id = ObjectID(id);

      return contactsCollection.deleteOne({ _id: id });
    }
  };
}
exports.initCRUD = initCRUD;